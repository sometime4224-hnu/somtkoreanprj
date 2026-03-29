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
        activeMeta: document.getElementById("active-clue-meta"),
        activeText: document.getElementById("active-clue-text"),
        activeClueVi: document.getElementById("active-clue-vi"),
        activeImage: document.getElementById("active-clue-image"),
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
        selectedTileId: "",
        openSheet: "",
        touchDrag: null,
        ignoreNextTileClick: false
    };

    function currentSet() {
        return preparedSets[state.currentSetIndex];
    }

    function activeWord() {
        return currentSet().wordsById.get(currentSet().activeWordId);
    }

    function isMobileLayout() {
        return mobileQuery.matches;
    }

    function cellKey(row, col) {
        return `${row}-${col}`;
    }

    function getTileById(set, tileId) {
        return set.letterBank.find((tile) => tile.id === tileId) || null;
    }

    function selectedTile() {
        return getTileById(currentSet(), state.selectedTileId);
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

    function createLetterBank(setId, cells) {
        const counts = new Map();
        cells.forEach((row) => {
            row.forEach((cell) => {
                if (!cell) {
                    return;
                }
                counts.set(cell.solution, (counts.get(cell.solution) || 0) + 1);
            });
        });

        const letters = Array.from(counts.keys()).sort((left, right) => left.localeCompare(right, "ko"));
        const tiles = [];
        let index = 1;

        letters.forEach((letter) => {
            for (let repeat = 0; repeat < counts.get(letter); repeat += 1) {
                tiles.push({
                    id: `${setId}-tile-${index}`,
                    letter,
                    used: false,
                    cellKey: ""
                });
                index += 1;
            }
        });

        return tiles;
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
                        tileId: "",
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
            letterBank: createLetterBank(set.id, cells),
            activeWordId: set.words[0].id
        };
    }

    const preparedSets = sets.map(createSetState);

    function syncBodySheetState() {
        const clueOpen = state.openSheet === "clue" && isMobileLayout();
        const bankOpen = state.openSheet === "bank" && isMobileLayout();
        const anyOpen = clueOpen || bankOpen;

        dom.body.classList.toggle("is-clue-open", clueOpen);
        dom.body.classList.toggle("is-bank-open", bankOpen);
        dom.body.classList.toggle("is-sheet-open", anyOpen);
        dom.mobileOverlay.setAttribute("aria-hidden", anyOpen ? "false" : "true");
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

    function flashElement(element, className, duration = 320) {
        if (!element) {
            return;
        }
        element.classList.remove(className);
        void element.offsetWidth;
        element.classList.add(className);
        window.setTimeout(() => {
            element.classList.remove(className);
        }, duration);
    }

    function flashTile(tileId, className) {
        const tile = dom.letterBank.querySelector(`[data-tile-id="${tileId}"]`);
        flashElement(tile, className);
    }

    function flashCell(row, col, className) {
        const cell = dom.grid.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        flashElement(cell, className);
    }

    function updateMobileDock() {
        const word = activeWord();
        const tile = selectedTile();
        dom.mobileClueMeta.textContent = word ? wordLabel(word) : "현재 낱말 보기";
        dom.mobileBankMeta.textContent = tile ? `선택: ${tile.letter}` : "선택한 글자 없음";
    }

    function updateBankSelection() {
        const tile = selectedTile();
        if (!tile) {
            dom.bankSelection.textContent = "선택한 글자 없음 · 글자를 누른 뒤 퍼즐 칸을 눌러 넣어 보세요. 칸을 다시 누르면 글자가 돌아옵니다.";
            updateMobileDock();
            return;
        }

        dom.bankSelection.textContent = `선택한 글자: ${tile.letter} · 퍼즐 칸을 누르거나 끌어다 놓아 보세요.`;
        updateMobileDock();
    }

    function syncSelectedTileState() {
        dom.letterBank.querySelectorAll("[data-tile-id]").forEach((tileButton) => {
            tileButton.classList.toggle("is-selected", tileButton.dataset.tileId === state.selectedTileId);
        });
        updateBankSelection();
    }

    function setSelectedTile(tileId, animate = false) {
        state.selectedTileId = tileId || "";
        syncSelectedTileState();
        if (animate && state.selectedTileId) {
            flashTile(state.selectedTileId, "is-pick-flash");
        }
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

    function renderLetterBank() {
        const set = currentSet();
        dom.letterBank.innerHTML = set.letterBank.map((tile) => `
            <button
                class="letter-tile ${tile.used ? "is-used" : ""} ${tile.id === state.selectedTileId ? "is-selected" : ""}"
                type="button"
                data-tile-id="${tile.id}"
                data-letter="${tile.letter}"
                draggable="${tile.used ? "false" : "true"}"
                ${tile.used ? "disabled" : ""}
                aria-label="${tile.letter} 글자"
            >${tile.letter}</button>
        `).join("");
    }

    function renderBoard() {
        const set = currentSet();
        const word = activeWord();
        const activeCoords = new Set(word.cells.map((cell) => cellKey(cell.row, cell.col)));

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

                const wrapper = document.createElement("button");
                wrapper.type = "button";
                wrapper.className = [
                    "grid-cell",
                    activeCoords.has(cellKey(row, col)) ? "is-active" : "",
                    cell.entries.length > 1 ? "is-cross" : "",
                    cell.value ? "is-filled" : "",
                    cell.entries.every((entry) => set.solvedWords.has(entry.wordId)) ? "is-solved" : ""
                ].filter(Boolean).join(" ");
                wrapper.dataset.row = String(row);
                wrapper.dataset.col = String(col);
                wrapper.setAttribute("aria-label", `${row + 1}행 ${col + 1}열`);

                const starter = set.words.find((item) => item.row === row && item.col === col);
                if (starter) {
                    const number = document.createElement("span");
                    number.className = "grid-cell__number";
                    number.textContent = String(starter.number);
                    wrapper.appendChild(number);
                }

                const value = document.createElement("span");
                value.className = "grid-cell__value";
                value.textContent = cell.value;
                wrapper.appendChild(value);

                wrapper.addEventListener("click", (event) => {
                    handleCellActivate(row, col, event);
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
                    const tileId =
                        event.dataTransfer?.getData("application/x-crossword-tile") ||
                        event.dataTransfer?.getData("text/plain") ||
                        "";
                    if (!tileId) {
                        return;
                    }
                    placeTileAt(row, col, tileId);
                });

                dom.grid.appendChild(wrapper);
            }
        }
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

    function refreshSolvedWords(set, activeBefore) {
        const wasActiveSolved = set.solvedWords.has(activeBefore);
        set.solvedWords.clear();

        set.words.forEach((word) => {
            if (setWordValue(set, word) === word.answer) {
                set.solvedWords.add(word.id);
            }
        });

        if (!set.activeWordId) {
            set.activeWordId = set.words[0].id;
            return;
        }

        if (set.solvedWords.has(activeBefore) && !wasActiveSolved) {
            const nextWord = set.words.find((word) => !set.solvedWords.has(word.id));
            if (nextWord) {
                set.activeWordId = nextWord.id;
            }
        }
    }

    function releaseTile(tileId) {
        const set = currentSet();
        const tile = getTileById(set, tileId);
        if (!tile) {
            return;
        }
        tile.used = false;
        tile.cellKey = "";
    }

    function clearCell(row, col) {
        const set = currentSet();
        const cell = set.cells[row][col];
        if (!cell || !cell.tileId) {
            return;
        }

        const activeBefore = set.activeWordId;
        const releasedTileId = cell.tileId;
        releaseTile(releasedTileId);
        cell.tileId = "";
        cell.value = "";
        refreshSolvedWords(set, activeBefore);
        renderBoard();
        renderLetterBank();
        syncSelectedTileState();
        updateActiveClue();
        flashCell(row, col, "is-cleared-flash");
        flashTile(releasedTileId, "is-pick-flash");
    }

    function placeTileAt(row, col, tileId) {
        const set = currentSet();
        const cell = set.cells[row][col];
        const tile = getTileById(set, tileId);
        if (!cell || !tile || tile.used) {
            return;
        }

        const activeBefore = set.activeWordId;
        if (cell.tileId) {
            releaseTile(cell.tileId);
        }

        cell.tileId = tile.id;
        cell.value = tile.letter;
        tile.used = true;
        tile.cellKey = cellKey(row, col);
        setSelectedTile("");
        refreshSolvedWords(set, activeBefore);
        renderBoard();
        renderLetterBank();
        syncSelectedTileState();
        updateActiveClue();
        flashCell(row, col, "is-filled-flash");
        flashTile(tile.id, "is-place-flash");
        closeMobileSheet();
    }

    function selectWord(wordId) {
        const set = currentSet();
        set.activeWordId = wordId;
        updateActiveClue();
        renderBoard();
    }

    function handleCellActivate(row, col, event) {
        const set = currentSet();
        const cell = set.cells[row][col];
        if (!cell) {
            return;
        }

        const candidate = cell.entries.find((entry) => entry.wordId === set.activeWordId) || cell.entries[0];
        selectWord(candidate.wordId);

        if (state.selectedTileId) {
            event.preventDefault();
            placeTileAt(row, col, state.selectedTileId);
            return;
        }

        if (cell.tileId) {
            event.preventDefault();
            clearCell(row, col);
            return;
        }

        if (isMobileLayout()) {
            event.preventDefault();
            openMobileSheet("bank");
        }
    }

    function findGridCellAt(x, y) {
        const element = document.elementFromPoint(x, y);
        if (!element) {
            return null;
        }
        return element.closest(".grid-cell:not(.is-block)");
    }

    function clearTouchDropTarget() {
        if (!state.touchDrag || !state.touchDrag.dropTarget) {
            return;
        }
        state.touchDrag.dropTarget.classList.remove("is-drop");
        state.touchDrag.dropTarget = null;
    }

    function ensureTouchGhost(letter) {
        const ghost = document.createElement("div");
        ghost.className = "letter-drag-ghost";
        ghost.textContent = letter;
        document.body.appendChild(ghost);
        return ghost;
    }

    function beginTouchTileDrag(tileId, x, y) {
        if (!state.touchDrag) {
            return;
        }

        const tile = getTileById(currentSet(), tileId);
        if (!tile || tile.used) {
            return;
        }

        state.touchDrag.started = true;
        state.touchDrag.ghost = ensureTouchGhost(tile.letter);
        setSelectedTile(tileId, false);
        dom.body.classList.add("is-dragging-letter");
        moveTouchTileDrag(x, y);
    }

    function moveTouchTileDrag(x, y) {
        if (!state.touchDrag || !state.touchDrag.started || !state.touchDrag.ghost) {
            return;
        }

        state.touchDrag.ghost.style.left = `${x}px`;
        state.touchDrag.ghost.style.top = `${y}px`;

        const target = findGridCellAt(x, y);
        if (target === state.touchDrag.dropTarget) {
            return;
        }

        clearTouchDropTarget();
        if (target) {
            target.classList.add("is-drop");
            state.touchDrag.dropTarget = target;
        }
    }

    function cleanupTouchDrag() {
        clearTouchDropTarget();
        if (state.touchDrag && state.touchDrag.ghost) {
            state.touchDrag.ghost.remove();
        }
        dom.body.classList.remove("is-dragging-letter");
        state.touchDrag = null;
    }

    function finishTouchTileDrag(x, y) {
        if (!state.touchDrag || !state.touchDrag.started) {
            cleanupTouchDrag();
            return false;
        }

        moveTouchTileDrag(x, y);
        const target = state.touchDrag.dropTarget;
        const tileId = state.touchDrag.tileId;
        cleanupTouchDrag();

        if (!target) {
            return false;
        }

        const row = Number(target.dataset.row);
        const col = Number(target.dataset.col);
        placeTileAt(row, col, tileId);
        return true;
    }

    function renderSet() {
        renderTabs();
        renderModeButtons();
        renderLetterBank();
        syncSelectedTileState();
        updateActiveClue();
        renderBoard();
    }

    dom.setTabs.addEventListener("click", (event) => {
        const button = event.target.closest("[data-set-index]");
        if (!button) {
            return;
        }

        state.currentSetIndex = Number(button.dataset.setIndex);
        state.selectedTileId = "";
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
        const tileButton = event.target.closest("[data-tile-id]");
        if (!tileButton || tileButton.disabled) {
            return;
        }

        if (state.ignoreNextTileClick) {
            state.ignoreNextTileClick = false;
            return;
        }

        const tileId = tileButton.dataset.tileId;
        const nextTileId = state.selectedTileId === tileId ? "" : tileId;
        setSelectedTile(nextTileId, Boolean(nextTileId));

        if (isMobileLayout() && nextTileId) {
            closeMobileSheet();
        }
    });

    dom.letterBank.addEventListener("dragstart", (event) => {
        const tileButton = event.target.closest("[data-tile-id]");
        if (!tileButton || tileButton.disabled || !event.dataTransfer) {
            return;
        }

        const tileId = tileButton.dataset.tileId;
        setSelectedTile(tileId, true);
        event.dataTransfer.effectAllowed = "copy";
        event.dataTransfer.setData("application/x-crossword-tile", tileId);
        event.dataTransfer.setData("text/plain", tileId);
    });

    dom.letterBank.addEventListener("touchstart", (event) => {
        const tileButton = event.target.closest("[data-tile-id]");
        if (!tileButton || tileButton.disabled || event.touches.length !== 1) {
            return;
        }

        state.ignoreNextTileClick = true;
        const touch = event.touches[0];
        state.touchDrag = {
            tileId: tileButton.dataset.tileId,
            startX: touch.clientX,
            startY: touch.clientY,
            started: false,
            ghost: null,
            dropTarget: null
        };
    }, { passive: true });

    dom.letterBank.addEventListener("touchmove", (event) => {
        if (!state.touchDrag || event.touches.length !== 1) {
            return;
        }

        const touch = event.touches[0];
        const dx = touch.clientX - state.touchDrag.startX;
        const dy = touch.clientY - state.touchDrag.startY;
        if (!state.touchDrag.started && Math.hypot(dx, dy) < 8) {
            return;
        }

        event.preventDefault();
        if (!state.touchDrag.started) {
            beginTouchTileDrag(state.touchDrag.tileId, touch.clientX, touch.clientY);
        } else {
            moveTouchTileDrag(touch.clientX, touch.clientY);
        }
    }, { passive: false });

    dom.letterBank.addEventListener("touchend", (event) => {
        if (!state.touchDrag) {
            return;
        }

        const touch = event.changedTouches[0];
        if (state.touchDrag.started) {
            event.preventDefault();
            finishTouchTileDrag(touch.clientX, touch.clientY);
            return;
        }

        const tileId = state.touchDrag.tileId;
        cleanupTouchDrag();
        const nextTileId = state.selectedTileId === tileId ? "" : tileId;
        setSelectedTile(nextTileId, Boolean(nextTileId));
        if (isMobileLayout() && nextTileId) {
            closeMobileSheet();
        }
    }, { passive: false });

    dom.letterBank.addEventListener("touchcancel", () => {
        cleanupTouchDrag();
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

    const handleViewportChange = () => {
        if (!isMobileLayout()) {
            closeMobileSheet();
        }
        updateMobileDock();
    };

    if (typeof mobileQuery.addEventListener === "function") {
        mobileQuery.addEventListener("change", handleViewportChange);
    } else if (typeof mobileQuery.addListener === "function") {
        mobileQuery.addListener(handleViewportChange);
    }

    renderSet();
})();
