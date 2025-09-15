function getValue(condition: boolean) {
  // 1
  console.log(`1: ${value}`);
  
  if (condition) {
    var value = 'yes';
    // 2
    console.log(`2: ${value}`);

    //return value;
  } else {
    // 3
    console.log(`3: ${value}`);
    //return null;
  }
  // 4
  console.log(`4: ${value}`);
  
}

getValue(true);
getValue(false);