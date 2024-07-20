onmessage = function(e) {
    const { board, node, jumlah_pion, type } = e.data

    function clearBoard(board) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                board[i][j] = ' ';
            }
        }
        return board;
    }

    function search(board, node, jumlah_pion, type) {
        let jumlah_queen = 0;
        let pengisiPapan = [];
        for (let i = 0; i < board.length; i++) {
            let isiBaris = [];
            for (let j = 0; j < board[0].length; j++) {
                isiBaris.push(' ');
            }
            pengisiPapan.push(isiBaris);
        }
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                let isiPapan = clearBoard(pengisiPapan);
                isiPapan[i][j] = 'Q';
                isiPapan = dfs(board, node, isiPapan, [i, j], type);
                isiPapan = bfs(board, node, isiPapan, [i, j]);
                let result = searchFromFirstQueen(board, node, isiPapan, i, j, 1, jumlah_pion, type);
                if (result[0] != null) {
                    postMessage({ solution: result[0] });
                    return;
                }
            }
        }
        postMessage({ solution: null });
    }

    function searchFromFirstQueen(board, node, isiPapan, x, y, jumlah_queen, jumlah_pion, type) {
        let jumlah_queen_before = jumlah_queen;
        const jumlah_max_queen = jumlah_pion;
        let sebelum = JSON.parse(JSON.stringify(isiPapan));
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                if (isiPapan[i][j] == ' ') {
                    isiPapan[i][j] = 'Q';
                    isiPapan = dfs(board, node, isiPapan, [i, j], type);
                    isiPapan = bfs(board, node, isiPapan, [i, j]);
                    jumlah_queen++;
                    if (jumlah_queen == jumlah_max_queen) {
                        return [isiPapan, jumlah_queen];
                    }
                    if (jumlah_queen < jumlah_max_queen) {
                        let result = searchFromFirstQueen(board, node, isiPapan, i, j, jumlah_queen, jumlah_pion, type);
                        if (result[0] == null) {
                            isiPapan = JSON.parse(JSON.stringify(sebelum));
                            isiPapan[i][j] = 'X';
                            jumlah_queen--;
                        } else if (jumlah_queen > jumlah_queen_before) {
                            return [result[0], jumlah_queen];
                        }
                    }
                }
            }
        }
        return [null, jumlah_queen];
    }

    function dfs(board, node, isiPapan, queen, type) {
        let x = queen[0]
        let y = queen[1]
        // type queen
        // type rook
        if (type == "queengame") {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (i != 0 || j != 0) {
                        let newX = x + i
                        let newY = y + j
                        if (newX >= 0 && newX < board.length && newY >= 0 && newY < board[0].length) {
                            if (isiPapan[newX][newY] == ' ' || isiPapan[newX][newY] == 'X') {
                                isiPapan[newX][newY] = 'X'
                                if (i == 0 || j == 0) {
                                    isiPapan = dfsnext(newX, newY, i, j, isiPapan, board)
                                }
                            }
                        }
                    }
                }
            }
        }
        else if (type == "queen") {
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

    search(board, node, jumlah_pion, type);
}