const grid = document.getElementById("puzzleGrid");
const shuffleButton = document.getElementById("shuffleButton");

let tiles = [];
let emptyTileIndex = 8; // El espacio vacío comienza en la última posición para una cuadrícula de 3x3

function createTiles() {
    // Crear 8 piezas numeradas y una pieza vacía
    for (let i = 0; i < 8; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.dataset.index = i;

        // Configurar la imagen de fondo para cada pieza
        const x = (i % 3) * 100;
        const y = Math.floor(i / 3) * 100;
        tile.style.backgroundPosition = `-${x}px -${y}px`;
        tile.style.backgroundImage = "url('https://www.finedininglovers.com/es/sites/g/files/xknfdk1706/files/styles/im_landscape_100/public/2021-10/tipos-de-frutas%C2%A9iStock.jpg.webp?itok=iSVVtY5m')"; // Cambia la ruta a la imagen que deseas usar

        grid.appendChild(tile);
        tiles.push(tile);
    }

    // Agregar la pieza vacía
    const emptyTile = document.createElement("div");
    emptyTile.classList.add("tile", "empty");
    grid.appendChild(emptyTile);
    tiles.push(emptyTile);

    // Mezclar las piezas después de crear el rompecabezas
    shuffleTiles();
}

function shuffleTiles() {
    // Mezclar las piezas usando el algoritmo Fisher-Yates
    for (let i = tiles.length - 2; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    updateGrid();
}

function updateGrid() {
    // Limpiar la cuadrícula y volver a agregar las piezas en el nuevo orden
    grid.innerHTML = "";
    tiles.forEach(tile => grid.appendChild(tile));
    emptyTileIndex = tiles.indexOf(tiles.find(tile => tile.classList.contains("empty")));
}

function moveTile(index) {
    const tile = tiles[index];
    const emptyTile = tiles[emptyTileIndex];

    // Calcular la posición de la pieza vacía y la pieza seleccionada
    const [tileX, tileY] = [index % 3, Math.floor(index / 3)];
    const [emptyX, emptyY] = [emptyTileIndex % 3, Math.floor(emptyTileIndex / 3)];

    // Comprobar si la pieza seleccionada está adyacente a la pieza vacía
    const isAdjacent = (Math.abs(tileX - emptyX) + Math.abs(tileY - emptyY)) === 1;

    if (isAdjacent) {
        // Intercambiar la pieza seleccionada con la pieza vacía
        [tiles[index], tiles[emptyTileIndex]] = [tiles[emptyTileIndex], tiles[index]];
        updateGrid();
    }

    if (checkWin()) {
        setTimeout(() => alert("Busca la URL: itsjustasnakegame.github.io"), 100);
    }
}

function checkWin() {
    // Verificar si las piezas están en el orden correcto
    for (let i = 0; i < 8; i++) {
        if (tiles[i].dataset.index != i) {
            return false;
        }
    }
    return true;
}

// Event Listeners
grid.addEventListener("click", (event) => {
    if (event.target.classList.contains("tile") && !event.target.classList.contains("empty")) {
        moveTile(tiles.indexOf(event.target));
    }
});

shuffleButton.addEventListener("click", shuffleTiles);

// Inicializar las piezas al cargar la página
createTiles();