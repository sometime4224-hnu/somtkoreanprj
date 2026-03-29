(function () {
    const imageBase = "../assets/c13/vocabulary/images/split-variants/full";
    const imageMap = {
        "집들이": `${imageBase}/s04_tl_n01.webp`,
        "돌잔치": `${imageBase}/s04_tr_n02.webp`,
        "송년회": `${imageBase}/s04_bl_n03.webp`,
        "송별회": `${imageBase}/s04_br_n04.webp`,
        "동창회": `${imageBase}/s03_tl_n05.webp`,
        "방꾸미다": `${imageBase}/s03_tr_n06.webp`,
        "상차리다": `${imageBase}/s03_bl_n07.webp`,
        "선물마련하다": `${imageBase}/s03_br_n08.webp`,
        "손님대접하다": `${imageBase}/s02_tl_n09.webp`,
        "충분하다": `${imageBase}/s02_tr_n10.webp`,
        "모자라다": `${imageBase}/s02_bl_n11.webp`,
        "남다": `${imageBase}/s02_br_n12.webp`,
        "부족하다": `${imageBase}/s01_tl_n13.webp`,
        "옷차려입다": `${imageBase}/s01_tr_n14.webp`,
        "넥타이매다": `${imageBase}/s01_bl_n15.webp`,
        "반지끼다": `${imageBase}/s01_br_n16.webp`,
        "귀고리하다": `${imageBase}/s05_tl_n17.webp`,
        "시계차다": `${imageBase}/s05_tr_n18.webp`,
        "가방들다": `${imageBase}/s05_bl_n19.webp`,
        "배낭매다": `${imageBase}/s05_br_n20.webp`
    };

    const hintCopyMap = {
        "집들이": { ko: "새 집에 사람들을 초대하는 모임", vi: "tiệc tân gia" },
        "돌잔치": { ko: "아이가 한 살 된 것을 기념하는 잔치", vi: "tiệc thôi nôi" },
        "송년회": { ko: "한 해를 마무리하며 함께 모이는 자리", vi: "tiệc cuối năm" },
        "송별회": { ko: "떠나는 사람과 작별 인사를 나누는 모임", vi: "tiệc chia tay" },
        "동창회": { ko: "같은 학교를 나온 사람들이 다시 만나는 모임", vi: "họp lớp" },
        "방꾸미다": { ko: "방을 예쁘게 장식하다", vi: "trang trí phòng" },
        "상차리다": { ko: "음식을 먹을 수 있게 상을 준비하다", vi: "dọn bàn ăn" },
        "선물마련하다": { ko: "필요한 선물을 미리 준비하다", vi: "chuẩn bị quà" },
        "손님대접하다": { ko: "손님에게 정성껏 음식을 내고 챙기다", vi: "tiếp đãi khách" },
        "충분하다": { ko: "필요한 만큼 넉넉하다", vi: "đủ" },
        "모자라다": { ko: "필요한 양보다 적다", vi: "thiếu" },
        "남다": { ko: "쓰고도 아직 남아 있다", vi: "còn lại, thừa" },
        "부족하다": { ko: "필요한 만큼 되지 않다", vi: "thiếu, không đủ" },
        "옷차려입다": { ko: "옷을 단정하고 예쁘게 입다", vi: "ăn mặc đẹp, diện" },
        "넥타이매다": { ko: "목에 넥타이를 묶다", vi: "thắt cà vạt" },
        "반지끼다": { ko: "손가락에 반지를 끼다", vi: "đeo nhẫn" },
        "귀고리하다": { ko: "귀에 귀고리를 하다", vi: "đeo bông tai" },
        "시계차다": { ko: "손목에 시계를 차다", vi: "đeo đồng hồ" },
        "가방들다": { ko: "손으로 가방을 들다", vi: "cầm túi xách" },
        "배낭매다": { ko: "어깨에 배낭을 메다", vi: "đeo ba lô" }
    };

    const sets = [
        {
            id: "set-1",
            title: "모임",
            rows: 7,
            cols: 7,
            words: [
                { id: "reunion", answer: "동창회", row: 0, col: 2, dir: "down" },
                { id: "year-end", answer: "송년회", row: 2, col: 0, dir: "across" },
                { id: "farewell", answer: "송별회", row: 2, col: 0, dir: "down" },
                { id: "bag", answer: "가방들다", row: 3, col: 4, dir: "down" },
                { id: "housewarming", answer: "집들이", row: 5, col: 3, dir: "across" }
            ]
        },
        {
            id: "set-2",
            title: "상태",
            rows: 6,
            cols: 6,
            words: [
                { id: "enough", answer: "충분하다", row: 2, col: 0, dir: "across" },
                { id: "lacking", answer: "부족하다", row: 0, col: 2, dir: "down" },
                { id: "remain", answer: "남다", row: 1, col: 3, dir: "down" },
                { id: "short", answer: "모자라다", row: 5, col: 0, dir: "across" }
            ]
        },
        {
            id: "set-3",
            title: "준비",
            rows: 8,
            cols: 8,
            words: [
                { id: "decorate-room", answer: "방꾸미다", row: 0, col: 3, dir: "down" },
                { id: "set-table", answer: "상차리다", row: 3, col: 0, dir: "across" },
                { id: "prepare-gift", answer: "선물마련하다", row: 6, col: 1, dir: "across" },
                { id: "treat-guest", answer: "손님대접하다", row: 2, col: 5, dir: "down" }
            ]
        },
        {
            id: "set-4",
            title: "차림",
            rows: 7,
            cols: 6,
            words: [
                { id: "dress-up", answer: "옷차려입다", row: 2, col: 0, dir: "across" },
                { id: "wear-watch", answer: "시계차다", row: 0, col: 1, dir: "down" },
                { id: "wear-tie", answer: "넥타이매다", row: 5, col: 0, dir: "across" },
                { id: "wear-backpack", answer: "배낭매다", row: 3, col: 3, dir: "down" }
            ]
        },
        {
            id: "set-5",
            title: "잔치",
            rows: 5,
            cols: 5,
            words: [
                { id: "first-birthday", answer: "돌잔치", row: 0, col: 0, dir: "across" },
                { id: "earrings", answer: "귀고리하다", row: 3, col: 0, dir: "across" },
                { id: "ring", answer: "반지끼다", row: 0, col: 4, dir: "down" }
            ]
        }
    ];

    const dom = {
        body: document.body,
        setTabs: document.getElementById("set-tabs"),
        modeButtons: Array.from(document.querySelectorAll(".mode-btn")),
        grid: document.getElementById("crossword-grid"),
        activeCard: document.getElementById("active-clue-card"),
        activeMeta: document.getElementById("active-clue-meta"),
        activeText: document.getElementById("active-clue-text"),
        activeClueVi: document.getElementById("active-clue-vi"),
        activeImage: document.getElementById("active-clue-image"),
        bankPanel: document.getElementById("bank-panel"),
        bankSelection: document.getElementById("bank-selection"),
        letterBank: document.getElementById("letter-bank"),
        mobileOverlay: document.getElementById("mobile-overlay"),
        mobileClueToggle: document.getElementById("mobile-clue-toggle"),
        mobileClueMeta: document.getElementById("mobile-clue-meta"),
        mobileBankToggle: document.getElementById("mobile-bank-toggle"),
        mobileBankMeta: document.getElementById("mobile-bank-meta"),
        mobileClueClose: document.getElementById("mobile-clue-close"),
        mobileBankClose: document.getElementById("mobile-bank-close")
    };

    const mobileQuery = window.matchMedia("(max-width: 640px)");

    const state = {
        currentSetIndex: 0,
        imageMode: "normal",
        selectedLetter: "",
        openSheet: ""
    };

    function shuffle(list) {
        const copy = [...list];
        for (let index = copy.length - 1; index > 0; index -= 1) {
            const swapIndex = Math.floor(Math.random() * (index + 1));
            [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
        }
        return copy;
    }

    function buildLetterBank(words) {
        const counts = new Map();
        words.forEach((word) => {
            Array.from(word.answer).forEach((letter) => {
                counts.set(letter, (counts.get(letter) || 0) + 1);
            });
        });

        const bank = [];
        counts.forEach((count, letter) => {
            const total = Math.min(count + 2, 5);
            for (let index = 0; index < total; index += 1) {
                bank.push(letter);
            }
        });

        return shuffle(bank);
    }

    function createSetState(set) {
        const cells = Array.from({ length: set.rows }, () => Array.from({ length: set.cols }, () => null));

        set.words.forEach((word) => {
            word.cells = [];
            for (let index = 0; index < word.answer.length; index += 1) {
                const row = word.row + (word.dir === "down" ? index : 0);
                const col = word.col + (word.dir === "across" ? index : 0);
                const solution = word.answer[index];

                if (!cells[row][col]) {
                    cells[row][col] = {
                        row,
                        col,
                        solution,
                        value: "",
                        entries: []
                    };
                }

                if (cells[row][col].solution !== solution) {
                    throw new Error(`Crossword collision in ${set.id} at ${row},${col}`);
                }

                cells[row][col].entries.push({ wordId: word.id, index });
                word.cells.push({ row, col });
            }
        });

        let nextNumber = 1;
        for (let row = 0; row < set.rows; row += 1) {
            for (let col = 0; col < set.cols; col += 1) {
                const starters = set.words.filter((word) => word.row === row && word.col === col);
                if (!starters.length) {
                    continue;
                }
                starters.forEach((word) => {
                    word.number = nextNumber;
                });
                nextNumber += 1;
            }
        }

        return {
            ...set,
            cells,
            wordsById: new Map(set.words.map((word) => [word.id, word])),
            solvedWords: new Set(),
            inputs: new Map(),
            letterBank: buildLetterBank(set.words),
            activeWordId: set.words[0].id
        };
    }

    const preparedSets = sets.map(createSetState);

    function currentSet() {
        return preparedSets[state.currentSetIndex];
    }

    function activeWord() {
        return currentSet().wordsById.get(currentSet().activeWordId);
    }

    function isMobileLayout() {
        return mobileQuery.matches;
    }

    function modeFolder() {
        return state.imageMode === "easy" ? "/initials/" : "/masked/";
    }

    function clueImageFor(word) {
        return imageMap[word.answer].replace("/full/", modeFolder());
    }

    function wordLabel(word) {
        return `${word.dir === "across" ? "가로" : "세로"} ${word.number}번`;
    }

    function setWordValue(set, word) {
        return word.cells.map(({ row, col }) => set.cells[row][col].value || "").join("");
    }

    function isWordSolved(set, word) {
        return setWordValue(set, word) === word.answer;
    }

    function syncBodySheetState() {
        const isClueOpen = state.openSheet === "clue" && isMobileLayout();
        const isBankOpen = state.openSheet === "bank" && isMobileLayout();
        const isSheetOpen = isClueOpen || isBankOpen;

        dom.body.classList.toggle("is-clue-open", isClueOpen);
        dom.body.classList.toggle("is-bank-open", isBankOpen);
        dom.body.classList.toggle("is-sheet-open", isSheetOpen);
        dom.mobileOverlay.setAttribute("aria-hidden", isSheetOpen ? "false" : "true");
    }

    function closeMobileSheet() {
        state.openSheet = "";
        syncBodySheetState();
    }

    function openMobileSheet(type) {
        if (!isMobileLayout()) {
            return;
        }
        state.openSheet = type;
        syncBodySheetState();
    }

    function toggleMobileSheet(type) {
        if (!isMobileLayout()) {
            return;
        }
        state.openSheet = state.openSheet === type ? "" : type;
        syncBodySheetState();
    }

    function updateMobileDock() {
        const word = activeWord();
        dom.mobileClueMeta.textContent = word ? wordLabel(word) : "현재 낱말 보기";
        dom.mobileBankMeta.textContent = state.selectedLetter ? `선택: ${state.selectedLetter}` : "선택한 글자 없음";
    }

    function updateBankSelection() {
        if (!state.selectedLetter) {
            dom.bankSelection.textContent = "선택한 글자 없음 · 글자를 누른 뒤 퍼즐 칸을 눌러 넣어 보세요.";
            updateMobileDock();
            return;
        }

        dom.bankSelection.textContent = `선택한 글자: ${state.selectedLetter} · 퍼즐 칸을 누르거나 끌어다 놓아 보세요.`;
        updateMobileDock();
    }

    function renderLetterBank() {
        const set = currentSet();
        dom.letterBank.innerHTML = set.letterBank.map((letter, index) => `
            <button
                class="letter-tile ${state.selectedLetter === letter ? "is-selected" : ""}"
                type="button"
                data-letter="${letter}"
                data-bank-index="${index}"
                draggable="true"
                aria-label="${letter} 글자"
            >${letter}</button>
        `).join("");
    }

    function syncSelectedLetterTiles() {
        dom.letterBank.querySelectorAll("[data-letter]").forEach((tile) => {
            tile.classList.toggle("is-selected", tile.dataset.letter === state.selectedLetter);
        });
    }

    function renderTabs() {
        dom.setTabs.innerHTML = preparedSets.map((set, index) => `
            <button class="set-tab ${index === state.currentSetIndex ? "is-active" : ""}" type="button" data-set-index="${index}">
                ${index + 1}. ${set.title}
            </button>
        `).join("");
    }

    function renderModeButtons() {
        dom.modeButtons.forEach((button) => {
            button.classList.toggle("is-active", button.dataset.mode === state.imageMode);
        });
    }

    function updateActiveClue() {
        const word = activeWord();
        const hint = hintCopyMap[word.answer];
        dom.activeMeta.textContent = `${wordLabel(word)} · ${state.imageMode === "easy" ? "초성" : "마스킹"}`;
        dom.activeText.textContent = `한글: ${hint.ko}`;
        dom.activeClueVi.textContent = `Tiếng Việt: ${hint.vi}`;
        dom.activeImage.src = clueImageFor(word);
        dom.activeImage.alt = `${hint.ko} 단서 그림`;
        updateMobileDock();
    }

    function renderBoard() {
        const set = currentSet();
        const word = activeWord();
        const activeCoords = new Set(word.cells.map((cell) => `${cell.row}-${cell.col}`));

        set.inputs = new Map();
        dom.grid.style.gridTemplateColumns = `repeat(${set.cols}, minmax(0, 1fr))`;
        dom.grid.innerHTML = "";

        for (let row = 0; row < set.rows; row += 1) {
            for (let col = 0; col < set.cols; col += 1) {
                const cell = set.cells[row][col];

                if (!cell) {
                    const block = document.createElement("div");
                    block.className = "grid-cell is-block";
                    dom.grid.appendChild(block);
                    continue;
                }

                const wrapper = document.createElement("label");
                const classes = ["grid-cell"];
                const fullySolved = cell.entries.every((entry) => set.solvedWords.has(entry.wordId));
                if (activeCoords.has(`${row}-${col}`)) {
                    classes.push("is-active");
                }
                if (cell.entries.length > 1) {
                    classes.push("is-cross");
                }
                if (fullySolved) {
                    classes.push("is-solved");
                }

                wrapper.className = classes.join(" ");
                wrapper.dataset.row = String(row);
                wrapper.dataset.col = String(col);

                const starter = set.words.find((item) => item.row === row && item.col === col);
                if (starter) {
                    const number = document.createElement("span");
                    number.className = "grid-cell__number";
                    number.textContent = String(starter.number);
                    wrapper.appendChild(number);
                }

                const input = document.createElement("input");
                input.type = "text";
                input.maxLength = 1;
                input.autocomplete = "off";
                input.spellcheck = false;
                input.inputMode = "text";
                input.value = cell.value;
                input.dataset.row = String(row);
                input.dataset.col = String(col);
                input.setAttribute("aria-label", `${row + 1}행 ${col + 1}열`);
                wrapper.appendChild(input);
                set.inputs.set(`${row}-${col}`, input);

                wrapper.addEventListener("click", (event) => {
                    const candidate = cell.entries.find((entry) => entry.wordId === set.activeWordId) || cell.entries[0];
                    selectWord(candidate.wordId, false);

                    if (state.selectedLetter) {
                        event.preventDefault();
                        placeLetter(row, col, state.selectedLetter);
                        return;
                    }

                    if (isMobileLayout()) {
                        event.preventDefault();
                        openMobileSheet("bank");
                        return;
                    }

                    window.setTimeout(() => {
                        input.focus();
                        input.select();
                    }, 0);
                });

                wrapper.addEventListener("dragover", (event) => {
                    event.preventDefault();
                    wrapper.classList.add("is-drop");
                });

                wrapper.addEventListener("dragleave", () => {
                    wrapper.classList.remove("is-drop");
                });

                wrapper.addEventListener("drop", (event) => {
                    event.preventDefault();
                    wrapper.classList.remove("is-drop");
                    const letter = event.dataTransfer ? event.dataTransfer.getData("text/plain") : "";
                    if (!letter) {
                        return;
                    }

                    const candidate = cell.entries.find((entry) => entry.wordId === set.activeWordId) || cell.entries[0];
                    selectWord(candidate.wordId, false);
                    placeLetter(row, col, letter);
                });

                input.addEventListener("focus", () => {
                    const candidate = cell.entries.find((entry) => entry.wordId === set.activeWordId) || cell.entries[0];
                    selectWord(candidate.wordId, false);
                });

                input.addEventListener("input", (event) => {
                    const raw = event.target.value.trim();
                    const finalChar = raw ? Array.from(raw).slice(-1)[0] : "";
                    cell.value = finalChar;
                    event.target.value = finalChar;
                    renderBoard();
                    autoAdvance(row, col);
                    maybeSolveActiveWord();
                });

                input.addEventListener("keydown", (event) => {
                    if (event.key === "Backspace" && !cell.value) {
                        moveToPreviousCell();
                    }
                });

                dom.grid.appendChild(wrapper);
            }
        }
    }

    function placeLetter(row, col, letter) {
        const set = currentSet();
        const cell = set.cells[row][col];
        if (!cell) {
            return;
        }

        cell.value = letter;
        renderBoard();
        autoAdvance(row, col);
        maybeSolveActiveWord();
    }

    function selectWord(wordId, focus = true) {
        const set = currentSet();
        set.activeWordId = wordId;
        updateActiveClue();
        renderBoard();

        if (!focus || isMobileLayout()) {
            return;
        }

        const word = activeWord();
        const nextCell = word.cells.find(({ row, col }) => !set.cells[row][col].value) || word.cells[0];
        const input = set.inputs.get(`${nextCell.row}-${nextCell.col}`);
        if (input) {
            input.focus();
            input.select();
        }
    }

    function autoAdvance(row, col) {
        if (isMobileLayout()) {
            return;
        }

        const set = currentSet();
        const word = activeWord();
        const index = word.cells.findIndex((cell) => cell.row === row && cell.col === col);
        if (index === -1 || index >= word.cells.length - 1) {
            return;
        }

        const next = word.cells[index + 1];
        const input = set.inputs.get(`${next.row}-${next.col}`);
        if (input) {
            input.focus();
            input.select();
        }
    }

    function moveToPreviousCell() {
        const set = currentSet();
        const word = activeWord();
        const activeElement = document.activeElement;

        if (!(activeElement instanceof HTMLInputElement)) {
            return;
        }

        const row = Number(activeElement.dataset.row);
        const col = Number(activeElement.dataset.col);
        const index = word.cells.findIndex((cell) => cell.row === row && cell.col === col);
        if (index <= 0) {
            return;
        }

        const previous = word.cells[index - 1];
        const input = set.inputs.get(`${previous.row}-${previous.col}`);
        if (input) {
            input.focus();
            input.select();
        }
    }

    function maybeSolveActiveWord() {
        const set = currentSet();
        const word = activeWord();

        if (setWordValue(set, word).length !== word.answer.length) {
            return;
        }

        if (!isWordSolved(set, word)) {
            return;
        }

        set.solvedWords.add(word.id);
        const nextWord = set.words.find((item) => !set.solvedWords.has(item.id));
        if (nextWord) {
            set.activeWordId = nextWord.id;
        }

        updateActiveClue();
        renderBoard();

        if (isMobileLayout() && !state.selectedLetter) {
            openMobileSheet("bank");
        }
    }

    function renderSet() {
        const set = currentSet();
        set.activeWordId = set.words[0].id;
        renderTabs();
        renderModeButtons();
        updateActiveClue();
        renderLetterBank();
        updateBankSelection();
        renderBoard();
    }

    dom.setTabs.addEventListener("click", (event) => {
        const button = event.target.closest("[data-set-index]");
        if (!button) {
            return;
        }

        state.currentSetIndex = Number(button.dataset.setIndex);
        state.selectedLetter = "";
        closeMobileSheet();
        renderSet();
    });

    dom.modeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (button.dataset.mode === state.imageMode) {
                return;
            }
            state.imageMode = button.dataset.mode;
            renderModeButtons();
            updateActiveClue();
        });
    });

    dom.letterBank.addEventListener("click", (event) => {
        const tile = event.target.closest("[data-letter]");
        if (!tile) {
            return;
        }

        state.selectedLetter = state.selectedLetter === tile.dataset.letter ? "" : tile.dataset.letter;
        syncSelectedLetterTiles();
        updateBankSelection();

        if (isMobileLayout() && state.selectedLetter) {
            closeMobileSheet();
        }
    });

    dom.letterBank.addEventListener("dragstart", (event) => {
        const tile = event.target.closest("[data-letter]");
        if (!tile || !event.dataTransfer) {
            return;
        }

        state.selectedLetter = tile.dataset.letter;
        syncSelectedLetterTiles();
        updateBankSelection();
        event.dataTransfer.effectAllowed = "copy";
        event.dataTransfer.setData("text/plain", tile.dataset.letter);
    });

    dom.mobileClueToggle.addEventListener("click", () => {
        toggleMobileSheet("clue");
    });

    dom.mobileBankToggle.addEventListener("click", () => {
        toggleMobileSheet("bank");
    });

    dom.mobileOverlay.addEventListener("click", closeMobileSheet);
    dom.mobileClueClose.addEventListener("click", closeMobileSheet);
    dom.mobileBankClose.addEventListener("click", closeMobileSheet);

    const mobileQueryListener = () => {
        if (!isMobileLayout()) {
            closeMobileSheet();
        }
        updateMobileDock();
    };

    if (typeof mobileQuery.addEventListener === "function") {
        mobileQuery.addEventListener("change", mobileQueryListener);
    } else if (typeof mobileQuery.addListener === "function") {
        mobileQuery.addListener(mobileQueryListener);
    }

    renderSet();
})();
