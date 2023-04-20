export function reset(rerender) {
    // Reset the camera
    resetElementValue("camera-radius", "input", "0");
    resetElementValue("camera-xangle", "input", "0");
    resetElementValue("camera-yangle", "input", "0");
    // Reset the projection
    resetElementValue("projection-type", "change", "orthographic");
    // Reset the shading
    resetCheckedValue("use-shading-check", "change", true);
    resetElementValue("light-color", "input", "#FFFFFF");
    resetElementValue("light-x", "change", "0");
    resetElementValue("light-y", "change", "0");
    resetElementValue("light-z", "change", "1");
    // Reset index
    resetElementValue("transform-index", "change", "0");
    // Reset translation
    resetElementValue("translation-x", "input", "0");
    resetElementValue("translation-y", "input", "0");
    resetElementValue("translation-z", "input", "0");
    // Reset rotation
    resetElementValue("rotation-x", "input", "0");
    resetElementValue("rotation-y", "input", "0");
    resetElementValue("rotation-z", "input", "0");
    // Reset scale
    resetElementValue("scale-x", "input", "1");
    resetElementValue("scale-y", "input", "1");
    resetElementValue("scale-z", "input", "1");
    // TODO:
    // Reset animation and texture
    setTimeout(function () {
        rerender();
    }, 0);
}
export function resetTransformation() {
    // Reset translation
    resetElementValue("translation-x", "input", "0");
    resetElementValue("translation-y", "input", "0");
    resetElementValue("translation-z", "input", "0");
    // Reset rotation
    resetElementValue("rotation-x", "input", "0");
    resetElementValue("rotation-y", "input", "0");
    resetElementValue("rotation-z", "input", "0");
    // Reset scale
    resetElementValue("scale-x", "input", "1");
    resetElementValue("scale-y", "input", "1");
    resetElementValue("scale-z", "input", "1");
}
function resetElementValue(id, eventName, value) {
    var element = document.getElementById(id);
    console.log("Ubah nilai elemen");
    console.log("b", element.value);
    element.value = value;
    console.log("a", element.value);
    element.dispatchEvent(new Event(eventName));
}
function resetCheckedValue(id, eventName, value) {
    var element = document.getElementById(id);
    element.checked = value;
    element.dispatchEvent(new Event(eventName));
}
//# sourceMappingURL=reset.js.map