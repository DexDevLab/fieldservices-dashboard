export function logger(type, message) {
  const DEBUG_TO_CONSOLE = true;

  let e = new Error();
  e = e.stack.split("\n")[2].split(":");
  let eString = "" + e;
  let output = eString
    .substring(eString.length-1, eString.lastIndexOf("//"))
    .replace("//./src/", "")
    .replace(",", "")
    .replace(/[0-9]/g, '')
    .trim()

    let date = new Date().toLocaleDateString('pt-br', { hour12: false, 
        hour: "numeric", 
        minute: "numeric",
        second: "numeric"});

  if (type) {
    if (type === "i") {
      type = "INFO";
    }
    if (type === "ERROR") {
      output = output.toUpperCase();
    }
  } else {
    type = "NULL";
  }

  const messageOutput = `[${date}] -- LOGGER -- ${type} -- ${message} \n at "${output}" \n`;

  DEBUG_TO_CONSOLE ? console.log(messageOutput) : "";
}
