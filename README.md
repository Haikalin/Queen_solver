### Queen Solver
Sebuah web program yang dibuat untuk menyelesaikan game Queens yang dimana kita harus meletakkan N buah ratu pada papan catur berukuran N x N sedemikian hingga tidak ada ratu yang saling menyerang. Program ini dibuat menggunakan bahasa pemrograman Javascript.

## Tech Stack
- HTML
- CSS
- Vanila Javascript

## Struktur Program
- index.html
- style.css
- code.js
- worker.js

## Algoritma
Dalam program ini digunakan 3 algoritma untuk menyelesaikan permainan yaitu:
1. Backtracking
   Backtracking merupakan algoritma yang digunakan untuk menyelesaikan permasalahan secara rekursif. Algoritma ini akan mencoba semua kemungkinan solusi yang ada dan jika solusi yang ditemukan tidak memenuhi syarat maka algoritma akan kembali ke solusi sebelumnya dan mencoba solusi yang lain. Pada program ini, backtracking digunakan untuk menentukan posisi awal ratu / bidak pada setiap region.
2. BFS
   BFS (Breadth First Search) merupakan algoritma yang digunakan untuk menelusuri semua simpul pada level yang sama terlebih dahulu sebelum melanjutkan ke level berikutnya. Pada program ini, BFS digunakan untuk mengeliminasi region yang sama dengan ratu / bidak yang diletakkan
3. DFS
   DFS (Depth First Search) merupakan algoritma yang digunakan untuk menelusuri semua simpul pada level yang sama terlebih dahulu sebelum melanjutkan ke level berikutnya. Pada program ini, DFS digunakan unutk mengeliminasi lokasi yang secara langsung dapat diserang oleh ratu / bidak yang diletakkan

## Cara Penggunaan
1. Ketik https://github.com/Haikalin/Queen_solver.git pada terminal
2. Ketik cd Queen_solver
3. Install ekstensi live server pada VSCode
4. Klik kanan pada file index.html dan pilih "Open with Live Server"
5. Masukkan input berupa teks dalam file dengan ekstensi .txt atau langsung masukkan input pada kolom input, dengan baris pertama berisi baris dan kolom, baris kedua jumlah region, dan baris ketiga hingga selesai papan catur yang akan diselesaikan
6. Klik tombol "Submit" untuk mengeluarkan output 

## Referensi Belajar
- [https://informatika.stei.itb.ac.id/~rinaldi.munir/Stmik/2023-2024/BFS-DFS-2021-Bag1-2024.pdf]
- [https://informatika.stei.itb.ac.id/~rinaldi.munir/Stmik/2020-2021/BFS-DFS-2021-Bag2.pdf]
- [https://informatika.stei.itb.ac.id/~rinaldi.munir/Stmik/2020-2021/Algoritma-backtracking-2021-Bagian1.pdf]
- [https://informatika.stei.itb.ac.id/~rinaldi.munir/Stmik/2020-2021/Algoritma-backtracking-2021-Bagian2.pdf]
- [https://www.w3schools.com/html/html5_webworkers.asp]