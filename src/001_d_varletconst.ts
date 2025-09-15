function getValueWithVar() {
  var value = 5;
  if (true) {
    var value = 6;
  }
  console.log(`In getValueWithVar: ${value}`);
}

function getValueWithLet() {
  let value = 5;
  if (true) {
    let value = 6;
  }
  console.log(`In getValueWithLet: ${value}`);
}

getValueWithVar();
getValueWithLet();