/*
Aplikasi pemesanan makanan
1. Menampilkan menu
2. Pencarian makanan
3. Melihat Keranjang
4. History pemesanan
5. Total: total semua
6. Subtotoal: total harga per item

koda-b4-homework1
    - index.js
    - flowchart-pesan-makanan.md
    - flowchart-keranjang.md
    - .... dst
    - README.md
*/

const daftarMenu = [
    {
        nama: "Jus",
        harga: 2000
    },
    {
        nama: "Mie",
        harga: 2000
    },
    {
        nama: "Bakso",
        harga: 2000
    },
]

let daftarKeranjang = []

const readLine =  require('node:readline')
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

const menuUtama = () => {
    console.log("\nSelamat Datang di Aplikasi Pemesanan Mixue\n")
    console.log("1. Cari Menu")
    console.log("2. Lihat Keranjang")
    console.log("3. Lihat History")
    console.log("4. EXIT\n")

    rl.question("Masukkan Input: ", (input) => {
        input = parseInt(input)
        switch (input) {
            case 1:
                console.clear();
                cariMenu()
                break;
            case 2:
                console.clear();
                lihatKeranjang()
                rl.close();
                break;
            case 3:
                console.log("history")
                rl.close();
                break;
            case 4:
                rl.close();
                break;
            default:
                console.log("ERROR")
                rl.close();
                break;
        }
    })
}

const cariMenu = () => {
    console.log(" --- Daftar Menu MIXUE --- ")
    let count = 0
    while (daftarMenu[count] !== undefined){
        console.log(`${count+1}. ${daftarMenu[count].nama}`)
        count++
    }

    rl.question("Masukkan No Menu: ", (input) => {
        input = parseInt(input)
        rl.question("Masukkan jumlah pesanan: ", (inputQty) =>{
            let dataMenuDipilih = [{
                ...daftarMenu[input],
                ...{
                    qty: parseInt(inputQty)
                }
            }]
            daftarKeranjang = [ ...daftarKeranjang, ...dataMenuDipilih ]
            rl.question("Ingin memilih menu lagi (y/n)? ", (input) => {
                switch (input) {
                    case "y":
                        console.clear();
                        cariMenu()
                        break;
                    case "n":
                        console.clear();
                        menuUtama()
                        rl.close
                        break
                    default:
                        console.log("ERROR")
                        break;
                }
            })
        })
    })
}

const lihatKeranjang = () => {
    console.log(" --- Daftar Keranjang --- ")
    let count = 0
    console.table(daftarKeranjang)
    // while (daftarKeranjang[count] !== undefined){
    //     console.table(`${count+1}. ${daftarKeranjang[count].nama}`)
    //     count++
    // }
}

menuUtama()
