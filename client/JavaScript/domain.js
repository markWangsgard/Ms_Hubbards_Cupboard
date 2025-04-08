// localStorage.clear();
export const addItem = (item) => {
    const itemList = [];
    if (!(localStorage.getItem("item-list") == null || localStorage.getItem("item-list") == "")) {
        const storedItemsString = localStorage.getItem("item-list")
        const storedItems = JSON.parse(storedItemsString);
        itemList.length = 0;
        storedItems.forEach(itemStored => {
            itemList.push(itemStored);
        });
    }
    itemList.push(item);

    localStorage.setItem("item-list", JSON.stringify(itemList));
}
export const getAllItems = () => {
    return JSON.parse(localStorage.getItem("item-list"));
}