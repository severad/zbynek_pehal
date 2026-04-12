const galleryContainer = document.getElementById("galleryContainer");
const imageInput = document.getElementById("imageInput");
const addImageBtn = document.getElementById("addImageBtn");
const openFilePickerBtn = document.getElementById("openFilePickerBtn");
const selectedFilesText = document.getElementById("selectedFilesText");

const getText = (key) => {
    if (window.appI18n && typeof window.appI18n.t === "function") {
        return window.appI18n.t(key);
    }
    const fallback = {
        "gallery-no-image": "Please select at least one image.",
        "gallery-delete-confirm": "Are you sure you want to delete this image?",
        "gallery-delete-btn": "Delete",
        "journal-no-file": "No file selected",
        "journal-files-selected": "files selected"
    };
    return fallback[key] || key;
};

let images = JSON.parse(localStorage.getItem("galleryImages") || "[]");

const showToast = (message) => {
    let toast = document.getElementById("app-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "app-toast";
        toast.className = "app-toast";
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 1700);
};

const updateSelectedFilesText = () => {
    if (!selectedFilesText || !imageInput) return;
    const count = imageInput.files?.length || 0;
    if (count === 0) {
        selectedFilesText.textContent = getText("journal-no-file");
    } else {
        selectedFilesText.textContent = `${count} ${getText("journal-files-selected")}`;
    }
};

function renderGallery() {
    if (!galleryContainer) return;
    galleryContainer.innerHTML = "";

    images.forEach((img, index) => {
        const col = document.createElement("div");
        col.className = "col-md-3 mb-3";
        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${img}" class="card-img-top" style="height:180px; object-fit:cover; border-radius: 14px 14px 0 0;" alt="Journal image ${index + 1}">
                <div class="card-body text-center p-2">
                    <button class="btn btn-sm btn-danger w-100" onclick="deleteImage(${index})">
                        <i class='bx bx-trash'></i> ${getText("gallery-delete-btn")}
                    </button>
                </div>
            </div>
        `;
        galleryContainer.appendChild(col);
    });
}

if (openFilePickerBtn && imageInput) {
    openFilePickerBtn.addEventListener("click", () => imageInput.click());
}

if (imageInput) {
    imageInput.addEventListener("change", updateSelectedFilesText);
}

if (addImageBtn) {
    addImageBtn.addEventListener("click", () => {
        const files = imageInput?.files;

        if (!files || files.length === 0) {
            showToast(getText("gallery-no-image"));
            return;
        }

        let processed = 0;
        Array.from(files).forEach((file) => {
            if (file.size > 2 * 1024 * 1024) {
                showToast(`File ${file.name} is too big. Max 2MB per image.`);
                processed += 1;
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    images.push(e.target?.result);
                    localStorage.setItem("galleryImages", JSON.stringify(images));
                } catch {
                    showToast("Storage is full! Please delete some old images.");
                }

                processed += 1;
                if (processed === files.length) {
                    renderGallery();
                    imageInput.value = "";
                    updateSelectedFilesText();
                }
            };
            reader.readAsDataURL(file);
        });
    });
}

window.deleteImage = (index) => {
    if (confirm(getText("gallery-delete-confirm"))) {
        images.splice(index, 1);
        localStorage.setItem("galleryImages", JSON.stringify(images));
        renderGallery();
    }
};

document.addEventListener("app:language-changed", () => {
    renderGallery();
    updateSelectedFilesText();
});

document.addEventListener("DOMContentLoaded", () => {
    renderGallery();
    updateSelectedFilesText();
});
