import { DOMUtils } from "./DOMUtils";
import { CategoryStorage } from "../storage/categoryStorage";
import { Category } from "../components/category";
import { addEventsToCategory } from "../handlers/categoryHandler";

let categoriesArray = CategoryStorage.getCategories();

export const newCategoryButton = {
  initializeButtonEvent: () => {
    const newCategoryBtn = document.getElementById("new-category-btn");
    // Handle showing category input
    newCategoryBtn.addEventListener("click", () => {
      showCategoryNewInput();
    });
  },
};

function showCategoryNewInput() {
  const categoryArea = document.querySelector(".categories-section");
  const newCategoryBtn = document.getElementById("new-category-btn");

  const categoryInput = DOMUtils.createInput();
  const addInputBtn = DOMUtils.createButton("Add", "add-category-confirm", () =>
    addCategoryToList(categoryInput.value)
  );
  // prettier-ignore
  const cancelInputBtn = DOMUtils.createButton("Cancel", "cancel-category-confirm", () => {
      removeCategoryInput(categoryInput, addInputBtn, cancelInputBtn, newCategoryBtn);
    });

  newCategoryBtn.style.display = "none";
  categoryArea.append(categoryInput, addInputBtn, cancelInputBtn);
}

function addCategoryToList(categoryName) {
  // save to local
  if (categoryName) {
    let newCat = new Category(categoryName, Date.now());
    categoriesArray.push(newCat);

    CategoryStorage.saveCategory(categoriesArray);
    displayCategories(categoriesArray);
  } else {
    alert("Please enter a category name!");
  }
}

displayCategories(CategoryStorage.getCategories());

function displayCategories(categoriesInStorage) {
  const categoryList = document.querySelector(".categories-list");
  categoryList.innerHTML = "";
  categoriesInStorage.forEach((category) => {
    const newCategory = document.createElement("li");
    newCategory.classList.add("category-item");
    newCategory.setAttribute("cat-id", category.id);
    newCategory.innerHTML = `<div>${category.name}</div>`;

    categoryList.append(newCategory);

    const deleteBtn = DOMUtils.createButton("Delete", "inside-category-btn");
    const editBtn = DOMUtils.createButton("Edit", "inside-category-btn");
    newCategory.append(editBtn, deleteBtn);

    addEventsToCategory(newCategory, deleteBtn, editBtn);

    document.querySelector(".cancel-category-confirm")?.click();
    newCategory.click();
  });
}
function removeCategoryInput(input, addBtn, cancelBtn, newCategoryBtn) {
  input.remove();
  addBtn.remove();
  cancelBtn.remove();
  newCategoryBtn.style.display = "block";
}
