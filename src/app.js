function init() {
  accordionComponent();
}

init();

function accordionComponent() {
  const iconMinus = getElement("#icon-minus-template").content;
  const iconPlus = getElement("#icon-plus-template").content;
  const accordionGroup = getElement("#accordionGroup");
  const accordions = getAllElements(".accordion", accordionGroup);
  const initComponent = () => {
    addAccordionControls();
    setOpenAccordion(accordions[0]);

    accordionGroup.addEventListener("click", (e) => {
      const activeAccordion = e.target.closest(".accordion");
      if (!activeAccordion) return;

      setOpenAccordion(activeAccordion);
    });
  };

  initComponent();

  /**
   * Adds the button and the necessary arias to all accordions.
   */
  function addAccordionControls() {
    const accordionButton = getElement("#accordion-button-template").content;

    accordions.forEach((accordion) => {
      const btnHeadingTemplate = accordionButton.cloneNode("true");
      const btnTemplate = getElement("button", btnHeadingTemplate);
      const btnTemplateTextElement = getElement(
        '[data-id="text"]',
        btnHeadingTemplate
      );
      const accordionHeading = getElement(
        ".accordion__panel__heading",
        accordion
      );
      const accordionContent = getElement('[role="region"]', accordion);

      btnTemplate.setAttribute("aria-controls", accordionContent.id);
      btnTemplateTextElement.textContent = accordionHeading.textContent;

      accordionHeading.replaceChildren(btnHeadingTemplate);
    });
  }

  /**
   * Opens the desire accordion and closes others.
   * @param {HTMLDivElement} accordion
   */
  function setOpenAccordion(accordion) {
    accordions.forEach((accordion) => {
      const accordionBtn = getElement("button", accordion);
      const accordionContent = getElement(".accordion__content", accordion);

      getElement("svg", accordionBtn).replaceChildren(iconPlus.cloneNode(true));
      accordionBtn.setAttribute("aria-expended", false);
      accordionContent.setAttribute("hidden", "");
    });

    const activeAccordionBtn = getElement("button", accordion);

    activeAccordionBtn.setAttribute("aria-expended", "true");
    getElement("svg", activeAccordionBtn).replaceChildren(
      iconMinus.cloneNode(true)
    );
    getElement(".accordion__content", accordion).removeAttribute("hidden");
  }
}

/* UTILITY FUNCTION */

function getElement(selector, parentElement = document) {
  const element = parentElement.querySelector(selector);

  if (!element) throw new Error(`element ${selector} not found.`);

  return element;
}

function getAllElements(selector, parentElement = document) {
  const elements = parentElement.querySelectorAll(selector);

  if (!elements) throw new Error(`element ${selector} not found.`);

  return elements;
}
