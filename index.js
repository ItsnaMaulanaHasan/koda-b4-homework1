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
        nama: "Mixue Ice Cream",
        harga: 8000
    },
    {
        nama: "BOBA Sundae",
        harga: 16000
    },
    {
        nama: "Strawberry Mi-Shake",
        harga: 16000
    },
    {
        nama: "BOBA Mi-Shake",
        harga: 16000
    },
    {
        nama: "Chocolate Cookies Smoothies",
        harga: 16000
    },
    {
        nama: "Brown Sugar Pearl Milk Tea",
        harga: 19000
    },
    {
        nama: "Pearl Milk Tea",
        harga: 22000
    },
    {
        nama: "Oats Milk Tea",
        harga: 22000
    },
    {
        nama: "Coconut Jelly Milk Tea",
        harga: 22000
    },
    {
        nama: "Red Bean Milk Tea",
        harga: 22000
    },
    {
        nama: "Fresh Squeezed Lemonade",
        harga: 10000
    },
    {
        nama: "Peach Earl Grey Tea",
        harga: 16000
    },
    {
        nama: "Original Jasmine Tea",
        harga: 10000
    },
    {
        nama: "Original Earl Grey Tea",
        harga: 10000
    },
]

let daftarKeranjang = []
let daftarHistory = []

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
                break;
            case 3:
                console.clear();
                lihatHistory()
                break;
            case 4:
                rl.close();
                break;
            default:
                rl.question("\n *Input tidak sesuai yang diharapkan*", () => {
                    console.clear();
                    menuUtama()
                })
                break;
        }
    })
}

const cariMenu = () => {
    console.log(" --- Daftar Menu MIXUE --- \n")
    let count = 0
    while (daftarMenu[count] !== undefined){
        console.log(` ${count+1}. ${daftarMenu[count].nama}, Harga: ${daftarMenu[count].harga}`);
        count++
    }
    console.log(" 99. Kembali ke menu utama")
    console.log(`\n -------------------------\n`);

    rl.question(` Masukkan no menu yang dipilih (1-${count}): `, (input) => {
        input = parseInt(input)
        if (input === 99){
            console.clear();
            menuUtama()
        }
        if (input > 0 && input <= count ) {
            input -= 1
            rl.question(" Masukkan jumlah pesanan: ", (inputQty) =>{
                let dataMenuDipilih = [{
                    ...daftarMenu[input],
                    ...{
                        qty: parseInt(inputQty)
                    },
                    ...{
                        subTotal: daftarMenu[input].harga * parseInt(inputQty)
                    }
                }]
                if (daftarKeranjang[0] !== undefined){
                    let count = 0
                    let flag = false
                    while(daftarKeranjang[count] !== undefined){
                        if (dataMenuDipilih[0].nama === daftarKeranjang[count].nama){
                            daftarKeranjang[count] = dataMenuDipilih[0]
                            flag = true
                        }
                        count++
                    }
                    if (flag === false){
                        daftarKeranjang = [ ...daftarKeranjang, ...dataMenuDipilih ]
                    } 
                } else {
                    daftarKeranjang = [ ...daftarKeranjang, ...dataMenuDipilih ]
                }
                console.log(`\n *${dataMenuDipilih[0].nama} sejumlah ${dataMenuDipilih[0].qty} berhasil ditambahkan ke keranjang*\n`)
                rl.question(" Ingin memilih menu lagi (y/n)? ", (input) => {
                    switch (input) {
                        case "y":
                        case "Y":
                            console.clear();
                            cariMenu()
                            break;
                        case "n":
                        case "N":
                            console.clear();
                            menuUtama()
                            break
                        default:
                            rl.question("\n *Input tidak sesuai yang diharapkan*", () => {
                                console.clear();
                                cariMenu()
                            })
                            break;
                    }
                })
            })
        } else {
            rl.question("\n *Input tidak sesuai yang diharapkan*", () => {
                console.clear();
                cariMenu()
            })
        }
    })
}

const lihatKeranjang = () => {
    console.log(" --- Daftar Keranjang --- \n")
    if (daftarKeranjang[0] === undefined){
        rl.question("\n *Keranjang masih kosong*\n", (input) => {
            console.clear()
            menuUtama()
        })
    } else{
        let count = 0
        let totalAll = 0
        while (daftarKeranjang[count] !== undefined){
            totalAll += daftarKeranjang[count].subTotal
            console.table(` ${count+1}. ${daftarKeranjang[count].nama}, Harga: ${daftarKeranjang[count].harga}, Jumlah: ${daftarKeranjang[count].qty}, Subtotal: ${daftarKeranjang[count].subTotal}`)
            count++
        }
        console.log(`\n -------------------------\n`);
        console.log(` Total Pesanan: ${totalAll}\n`)
        
        rl.question(" Lakukan pemesanan (y/n)? ", (input) => {
            switch (input) {
                case "y":
                case "Y":
                    console.clear();
                    rl.question(`\n Anda yakin ingin melakukan pemesanan dengan total ${totalAll} (y/n)? `, (input) => {
                        switch (input) {
                            case "y":
                            case "Y":
                                daftarHistory = [ ...daftarHistory, ...daftarKeranjang]
                                daftarKeranjang = []
                                rl.question("\n *Selamat anda berhasil melakukan pemesanan*\n \n Silahkan lakukan pembayaran di kasir ", () => {
                                    console.clear()
                                    menuUtama()
                                })
                                break;
                            case "n":
                            case "N":
                                console.clear()
                                lihatKeranjang()
                                break;
                            default:
                                rl.question("\n *Input tidak sesuai yang diharapkan*", () => {
                                    console.clear();
                                    lihatKeranjang()
                                })
                                break;
                        }
                    })
                    break;
                case "n":
                case "N":
                    console.clear();
                    menuUtama()
                    break
                default:
                    rl.question("\n *Input tidak sesuai yang diharapkan*", () => {
                        console.clear();
                        lihatKeranjang()
                    })
                    break;
            }
        })
    }
}

const lihatHistory = () => {
    console.log(" --- Daftar History Pemesanan --- \n")
    if (daftarHistory[0] === undefined){
        rl.question("\n *History Pemesanan masih kosong*\n", (input) => {
            console.clear()
            menuUtama()
        })
    } else {
        let count = 0
        while (daftarHistory[count] !== undefined){
            console.table(` ${count+1}. ${daftarHistory[count].nama}, Harga: ${daftarHistory[count].harga}, Jumlah: ${daftarHistory[count].qty}, Subtotal: ${daftarHistory[count].subTotal}`)
            count++
        }
        console.log(`\n -------------------------\n`);

        rl.question(" ",() => {
            console.clear()
            menuUtama()
        })
    }
}

console.clear()
menuUtama()
