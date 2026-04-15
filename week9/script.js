function calculate() {
    var txta = document.getElementById("numA").value;
    var txtb = document.getElementById("numB").value;

    document.getElementById("numA").classList.remove("error-input");
    document.getElementById("numB").classList.remove("error-input");

    if (txta === "" || isNaN(txta)) {
        alert("Number A is formatted incorrect");
        document.getElementById("numA").classList.add("error-input");
    } 
    else if (txtb === "" || isNaN(txtb)) {
        alert("Number B is formatted incorrect");
        document.getElementById("numB").classList.add("error-input");
    } 
    else {
        var result = parseFloat(txta) + parseFloat(txtb);
        alert("Result:\n" + txta + " + " + txtb + " = " + result);
    }
}