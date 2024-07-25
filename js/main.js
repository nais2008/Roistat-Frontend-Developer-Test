document.addEventListener("DOMContentLoaded", () => {
    // переменные
    const openModalButton = document.getElementById("open-modal");
    const closeModalButton = document.getElementById("close-modal");
    const modalWindow = document.getElementById("modal-window");
    const userForm = document.getElementById("userForm");
    const userNameInput = document.getElementById("name");
    const userNumberInput = document.getElementById("number");
    const parentUserSelect = document.getElementById("nach");
    const userTable = document.getElementById("userTable");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // сохраненение user
    const saveUsers = () => {
        localStorage.setItem("users", JSON.stringify(users));
    };

    // созданием строки с пользователем
    const generateUserRow = (user, depth = 0) => {
        const row = document.createElement("tr");
        row.dataset.id = user.id;
        row.innerHTML = `
            <td style="padding-left: ${depth * 20}px;">${user.name}</td>
            <td>${user.phone}</td>
            <td>${user.parentName || ''}</td>
        `;
        userTable.appendChild(row);

        users.filter(u => u.parentId === user.id).forEach(childUser => generateUserRow(childUser, depth + 1));
    };

    const refreshTable = () => {
        userTable.innerHTML = "";
        users.filter(u => !u.parentId).forEach(user => generateUserRow(user));
    };

    // обновление select с выбором начальника
    const updateParentSelect = () => {
        parentUserSelect.innerHTML = '<option value="">-</option>';
        users.forEach(user => {
            const option = document.createElement("option");
            option.value = user.id;
            option.textContent = user.name;
            parentUserSelect.appendChild(option);
        });
    };

    // открытие модального окна
    openModalButton.onclick = () => {
        modalWindow.classList.remove("hidden");
        updateParentSelect();
    };

    // закрытие модального окна
    closeModalButton.onclick = () => {
        modalWindow.classList.add("hidden");
    };

    window.onclick = (event) => {
        if (event.target === modalWindow) {
            modalWindow.classList.add("hidden");
        }
    };

    // сохранение данных
    userForm.onsubmit = (event) => {
        event.preventDefault();
        const userName = userNameInput.value;
        const userPhone = userNumberInput.value;
        const parentUserId = parentUserSelect.value;
        const parentUser = users.find(user => user.id === parentUserId);

        const newUser = {
            id: Date.now().toString(),
            name: userName,
            phone: userPhone,
            parentId: parentUserId || null,
            parentName: parentUser ? parentUser.name : null
        };

        users.push(newUser);
        saveUsers();
        refreshTable();
        modalWindow.classList.add("hidden");
        userForm.reset();
    };

    refreshTable();
});