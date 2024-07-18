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
        console.log("Salah euy")
        return
    } 
    getNodeBeside(board, jumlah_pion)
}

function getNodeBeside(row, jumlah_pion) {
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
    search(row, node, jumlah_pion)
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

function search(board, node, jumlah_pion) {
    let jawab = document.getElementById("answer")
    let pengisiPapan = []
    for (let i = 0; i < board.length; i++) {
        let isiBaris = []
        for (let j = 0; j < board[0].length; j++) {
            isiBaris.push(' ')
        }
        pengisiPapan.push(isiBaris)
    }
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            let isiPapan = clearBoard(pengisiPapan)
            isiPapan[i][j] = 'Q'
            isiPapan = dfs(board, node, isiPapan, [i, j])
            isiPapan = bfs(board, node, isiPapan, [i, j])
            isiPapan = searchFromFirstQueen(board, node, isiPapan, i, j, 1, jumlah_pion)
            if (isiPapan != null) {
                isiKePapan(board, isiPapan, jumlah_pion)
                return
            }
        }
    }
    console.log("Tidak ada solusi")
    document.getElementById("answer").innerHTML = "Tidak ada solusi"
}

function searchFromFirstQueen(board, node, isiPapan, x, y, jumlah_queen, jumlah_pion) {
    const jumlah_max_queen = jumlah_pion
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (isiPapan[i][j] == ' ') {
                isiPapan[i][j] = 'Q'
                isiPapan = dfs(board, node, isiPapan, [i, j])
                isiPapan = bfs(board, node, isiPapan, [i, j])
                jumlah_queen++
                if (jumlah_queen == jumlah_max_queen) {
                    console.log("Selesai:", isiPapan, jumlah_queen)
                    return isiPapan
                }
                if (jumlah_queen < jumlah_max_queen) {
                    isiPapan = searchFromFirstQueen(board, node, isiPapan, i, j, jumlah_queen, jumlah_pion)
                    return isiPapan
                }
            }
        }        
    }
}

function dfs(board, node, isiPapan, queen) {
    let type = document.getElementById("selectType").value
    let x = queen[0]
    let y = queen[1]
    // type queen
    // type rook
    if (type == "queen") {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i != 0 || j != 0) {
                    let newX = x + i
                    let newY = y + j
                    if (newX >= 0 && newX < board.length && newY >= 0 && newY < board[0].length) {
                        if (isiPapan[newX][newY] == ' ' || isiPapan[newX][newY] == 'X') {
                            isiPapan[newX][newY] = 'X'
                            isiPapan = dfsnext(newX, newY, i, j, isiPapan, board)
                        }
                    }
                }
            }
        }
    }
    else if (type == "rook") {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if ((i == 0 || j == 0) && (i != 0 || j != 0)) {
                    let newX = x + i
                    let newY = y + j
                    if (newX >= 0 && newX < board.length && newY >= 0 && newY < board[0].length) {
                        if (isiPapan[newX][newY] == ' ' || isiPapan[newX][newY] == 'X') {
                            isiPapan[newX][newY] = 'X'
                            isiPapan = dfsnext(newX, newY, i, j, isiPapan, board)
                        }
                    }
                }
            }
        }
    }
    // type bishop
    else if (type == "bishop") {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if ((i != 0 || j != 0) && (i != 0 && j != 0)) {
                    let newX = x + i
                    let newY = y + j
                    if (newX >= 0 && newX < board.length && newY >= 0 && newY < board[0].length) {
                        if (isiPapan[newX][newY] == ' ' || isiPapan[newX][newY] == 'X') {
                            isiPapan[newX][newY] = 'X'
                            isiPapan = dfsnext(newX, newY, i, j, isiPapan, board)
                        }
                    }
                }
            }
        }
    }

    return isiPapan
}

function dfsnext(xnow, ynow, xmove, ymove, isiPapan, board) {
    let x = xnow
    let y = ynow
    while (x >= 0 && x < board.length && y >= 0 && y < board[0].length) {
        if (isiPapan[x][y] == ' ') {
            isiPapan[x][y] = 'X'
        }
        x += xmove
        y += ymove
    }
    return isiPapan
}

function bfs(board, node, isiPapan, queen) {
    let x = queen[0]
    let y = queen[1]
    let daerah = board[x][y]
    let queue = []
    let kunjung = []

    queue.push(queen)
    kunjung.push(queen)
    while (queue.length > 0) {
        let now = queue.shift()
        let x = now[0]
        let y = now[1]
        for (let i = 0; i < node[x][y].length; i++) {
            let xnext = node[x][y][i][0]
            let ynext = node[x][y][i][1]
            if ((isiPapan[xnext][ynext] == ' ' || isiPapan[xnext][ynext] == 'X') && board[xnext][ynext] == daerah && !adaDiDalam(kunjung, xnext, ynext)) { 
                isiPapan[xnext][ynext] = 'X'
                queue.push([xnext, ynext])
                kunjung.push([xnext, ynext])
            }
        }
    }
    return isiPapan
}

function adaDiDalam(arr, x, y) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] == x && arr[i][1] == y) {
            return true
        }
    }
    return false
}

function isiKePapan(board, isiPapan, max_piece) {
    console.log("Masuk sini")
    let getAllDifferent = getChar(board)
    let colorData = getColor(max_piece)
    let kata = ""
    let jawab = document.getElementById("answer")
    letisiPapan = clearX(isiPapan)
    for (let i = 0; i < isiPapan.length; i++) {
        kata += "<tr>"
        for (let j = 0; j < isiPapan[0].length; j++) {
            let index = getAllDifferent.indexOf(board[i][j]);
            kata += `<td style="background-color:rgb(${colorData[index][0]},${colorData[index][1]},${colorData[index][2]}); width:1.5rem; height:1.5rem">${isiPapan[i][j]}</td>`;
        }
        kata += "</tr>"
    }
    console.log(kata)
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
    console.log(allcolorData)
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
    console.log(data)
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