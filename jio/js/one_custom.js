function getCookie(name)
{
  var re = new RegExp(name + "=([^;]+)");
  var value = re.exec(document.cookie);
  return (value != null) ? unescape(value[1]) : null;
}

function getAgentLink()
{

   window.open("http://onedemo-telco.azurewebsites.net/agent/?tid=" + getCookie('_one_MjMzODc3'), '_blank');
}