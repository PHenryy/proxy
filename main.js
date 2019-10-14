const $go = document.querySelector(".button_go");

$go.addEventListener("click", function() {
  const $proxySource = document.querySelector("#proxy_source");
  const $searchInput = document.querySelector("#search_input");

  const source = $proxySource.value;
  const search = $searchInput.value;
  const domains = ["com", "cn", "net", "dev"];
  const parts = search.split(".");
  const tld = parts[parts.length - 1];

  if (domains.includes(tld)) {
    window.open(source + "/-----" + search);
  } else {
    window.open(source + "/-----" + "https://www.google.com/search?q=" + search);
  }
});
