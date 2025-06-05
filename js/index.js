document.addEventListener("DOMContentLoaded", () => {
  const pageLayout = document.querySelector(".pageLayout");
  const header = document.querySelector(".header");
  const burger = document.querySelector(".header__burger");
  const nav = document.querySelector(".header__nav");
  const attrOverlay = "[data-js-modal-overlay]";
  const overlay = document.querySelector(attrOverlay);

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    nav.classList.toggle("open");
    pageLayout.classList.toggle("isOpenMenu");
  });

  document.addEventListener("scroll", () => {
      header.classList.toggle("isScrolling", !!pageLayout && getScrollPosition(pageLayout).top > 60);
  })

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (burger?.classList.contains("active") || nav?.classList.contains("open") || pageLayout?.classList.contains("isOpenMenu")) {
                burger?.classList.remove("active");
                nav?.classList.remove("open");
                pageLayout?.classList.remove("isOpenMenu");
            }

            if (overlay?.classList.contains("isModalOpen") || pageLayout?.classList.contains("isModalOpen")) {
                overlay.classList.remove("isModalOpen");
                pageLayout.classList.remove("isModalOpen");
            }
        }
    });

    onScrollHeaderLink(burger, nav, pageLayout);
    onSendForm();
    modalHandler(pageLayout, overlay);
});

const getScrollPosition = (el = document.body) => {
    return {
        left: (window.pageXOffset || el.scrollLeft) - (el.clientLeft || 0),
        top: (window.pageYOffset || el.scrollTop) - (el.clientTop || 0)
    };
};

const onScrollHeaderLink = (burger, nav, pageLayout) => {
    const attr= "data-js-header-link";
    const els = document.querySelectorAll(`[${attr}]`);

    els?.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const cfg = item.getAttribute(attr);
            const container = document.querySelector(cfg)

            container?.scrollIntoView({ block: "start", behavior: "smooth" })

            if (burger?.classList.contains("active") || nav?.classList.contains("open") || pageLayout?.classList.contains("isOpenMenu")) {
                burger?.classList.remove("active");
                nav?.classList.remove("open");
                pageLayout?.classList.remove("isOpenMenu");
            }
        })
    })
}


const onSendForm = () => {
    const attrForm = "[data-js-form]";
    const attrInput = "[data-js-input-required]"
    const attrMsg = "[data-js-form-msg]";

    const forms = document.querySelectorAll(attrForm);
    const inputs = document.querySelectorAll(attrInput);
    const msgs = document.querySelectorAll(attrMsg);

    forms.forEach((form, index) => {
        form.addEventListener("submit", (e) => {
            e.stopPropagation();
            e.preventDefault();
            onValidInput(inputs[index], msgs[index]);
        })
    })

    inputs.forEach((input, index) => input.addEventListener("input", () => onValidInput(input, msgs[index])));
}

const onValidInput = (input, msg) => {
    switch (true) {
        case !input.value:
            msg.innerHTML = "Заполните поле";
            if (!msg.classList.contains("isActive")) {
                msg.classList.add("isActive")
            }
            break;
        case !validateEmail(input.value):
            msg.innerHTML = "Невалидный email";
            if (!msg.classList.contains("isActive")) {
                msg.classList.add("isActive")
            }
            break;
        default:
            msg.innerHTML = "";
            if (msg.classList.contains("isActive")) {
                msg.classList.remove("isActive")
            }
            break;
    }
}

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

const modalHandler = (pageLayout, overlay) => {
    const attr = "[data-js-modal]";
    const attrOpenBtn = "[data-js-modal-open]";
    const attrCloseBtn = "[data-js-modal-close]";

    const openBtn = document.querySelector(attrOpenBtn);
    const closeBtn = document.querySelector(attrCloseBtn);

    openBtn?.addEventListener("click", () => {
        overlay.classList.add("isModalOpen");
        pageLayout.classList.add("isModalOpen");
    })

    closeBtn?.addEventListener("click", () => {
        overlay.classList.remove("isModalOpen");
        pageLayout.classList.remove("isModalOpen");
    })

    overlay?.addEventListener("click", (e) => {
        if (!e.target.closest(attr)) {
            overlay.classList.remove("isModalOpen");
            pageLayout.classList.remove("isModalOpen");
        }
    })
}
