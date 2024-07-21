function getBoard(event) {
    event.preventDefault()
    let board = document.getElementById("inputBoard")
    makeBoard(board.value)
}

function getBoard2(event) {
    event.preventDefault()
    let fileInput = document.getElementById("file");
    let file = fileInput.files[0];  // Ambil file yang diunggah
    
    if (file) {
        let reader = new FileReader();
        
        reader.onload = function(e) {
            let content = e.target.result;
            content = content.replace(/\r/g, ''); 
            makeBoard(content)
        }
        
        reader.readAsText(file);  // Baca file sebagai teks
    } else {
        console.log("No file selected");
    }
}

function makeBoard(input) {
    let type = document.getElementById("selectType").value
    let answer = document.getElementById("answer")
    let row = input.split('\n')
    let size = row[0].split(' ')
    let height = size[0]
    let width = size[1]
    let jumlah_pion = row[1]
    let board = []
    for (let i = 2; i < row.length; i++) {
        board.push(row[i].split(' '))
    }
    if (board.length != height || board[0].length != width) {
        return
    }
    let region = getChar(board)
    console.log(region)
    console.log(jumlah_pion)
    if (region.length != jumlah_pion) {
        answer.innerHTML = "Jumlah bidak tidak sesuai"
        return
    }
    getNodeBeside(board, jumlah_pion, type)
}

function getNodeBeside(row, jumlah_pion, type) {
    let node = []
    let baris = row.length
    let kolom = row[0].length
    for (let i = 0; i < baris; i++) {
        let nodeRow = []
        for (let j = 0; j < kolom; j++) {
            let temp = nodeBesideOneNode(i, j, row)
            nodeRow.push(temp)
        }
        node.push(nodeRow)
    }
    let jawab = document.getElementById("answer")
    jawab.innerHTML = "Sedang mencari..."
    startSearch(row, node, jumlah_pion, type)
}   

function nodeBesideOneNode(x, y, row) {
    let baris = row.length
    let kolom = row[0].length
    let node = []
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            let location = []
            if (i == 0 && j == 0) {
                continue
            }
            let newX = x + i
            let newY = y + j
            if (newX >= 0 && newX < baris && newY >= 0 && newY < kolom) {
                location.push(newX)
                location.push(newY)
                node.push(location)
            }
        }
    }
    return node;
}

// board berisi wilayah
// node berisi tetangga

function clearBoard(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
                board[i][j] = ' '
        }
    }
    return board
}

function startSearch(board, node, jumlah_pion, type) {
    const worker = new Worker('worker.js');
    worker.onmessage = function(e) {
        const { solution } = e.data;
        const jawab = document.getElementById("answer");
        if (solution) {
            isiKePapan(board, solution, jumlah_pion);
        } else {
            jawab.innerHTML = "Tidak ada solusi";
        }
    };
    worker.postMessage({ board, node, jumlah_pion, type });
}

function isiKePapan(board, isiPapan, max_piece) {
    let getAllDifferent = getChar(board)
    let colorData = getColor(max_piece)
    let kata = ""
    let jawab = document.getElementById("answer")
    isiPapan = clearX(isiPapan)
    for (let i = 0; i < isiPapan.length; i++) {
        kata += "<tr>"
        for (let j = 0; j < isiPapan[0].length; j++) {
            let index = getAllDifferent.indexOf(board[i][j]);
            kata += `<td style="background-color:rgb(${colorData[index][0]},${colorData[index][1]},${colorData[index][2]}); width:1.5rem; height:1.5rem">${isiPapan[i][j]}</td>`;
        }
        kata += "</tr>"
    }
    jawab.innerHTML = kata
}

function getColor(max_piece) {
    let allcolorData = []
    for (let i = 0; i < max_piece; i++) {
        let colorData = []
        for (let j = 0; j < 3; j++) {
            colorData.push(Math.floor(Math.random()*255))
        }
        allcolorData.push(colorData)
    }
    return allcolorData
}

function getChar(board) {
    let data = []
    for (let i = 0; i < board.length; i++) {
        for(let j = 0; j < board[0].length; j++) {
            if (!data.includes(board[i][j])) {
                data.push(board[i][j])
            }
        }
    }
    return data
}

function clearX(isiPapan) {
    for (let i = 0; i < isiPapan.length; i++) {
        for(let j = 0; j < isiPapan[0].length; j++) {
            if (isiPapan[i][j] == 'X') {
                isiPapan[i][j] = ' '
            }
        }
    }
    return isiPapan
}