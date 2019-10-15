const $go = document.querySelector(".button_go");
const $select = document.querySelector(".select");
const $selectOptions = document.querySelector(".select_options");
const $searchInput = document.querySelector("#search_input");
const $optionSelected = document.querySelector(".option_selected");
const $proxySource = document.querySelector("#proxy_source");

window.addEventListener("click", function() {
  if (isSelectOptionsVisible($selectOptions)) {
    $selectOptions.classList.remove("select_options-visible");
  }
});

$select.addEventListener("click", function(event) {
  event.stopPropagation();
  toggleClass($selectOptions, "select_options-visible");
});

$selectOptions.addEventListener("click", function(event) {
  const target = event.target || event.srcElement;
  if (target.nodeName.toLowerCase() === "li") {
    const $selectOptionsItems = document.querySelectorAll(".select_options .select_option");
    Array.prototype.forEach.call($selectOptionsItems, function(item) {
      if (item !== target) {
        item.classList.remove("select_option-selected");
      } else {
        target.classList.add("select_option-selected");
        $optionSelected.innerHTML = target.getAttribute("value");
      }
    });
  }
});

$go.addEventListener("click", function() {
  const optionsAttrs = getOptionSelectedAttrs();
  const source = optionsAttrs.value;
  const proxy = optionsAttrs.proxy;
  const search = $searchInput.value;
  const domains = ["com", "cn", "net", "dev", "win"];
  const parts = search.split(".");
  const tld = parts[parts.length - 1];
  console.log("OUTPUT: tld", tld);

  if (proxy === "false") {
    window.open(source + "/s?wd=" + search);
  } else {
    if (domains.includes(tld)) {
      window.open(source + "/-----" + search);
    } else {
      window.open(source + "/-----" + "https://www.google.com/search?q=" + search);
    }
  }
});

$searchInput.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    $go.click();
  }
});

function isSelectOptionsVisible(element) {
  if (element.classList.contains("select_options-visible")) {
    return true;
  }
  return false;
}

function toggleClass(element, className) {
  if (element.classList.contains(className)) {
    element.classList.remove(className);
  } else {
    element.classList.add(className);
  }
}

function getOptionSelectedAttrs() {
  let attrs = {};
  Array.prototype.forEach.call($selectOptions.children, function(option) {
    if (option.classList.contains("select_option-selected")) {
      attrs = {
        value: option.getAttribute("value"),
        proxy: option.getAttribute("data-proxy")
      };
    }
  });
  return attrs;
}
