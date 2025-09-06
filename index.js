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
    console.clear()
    console.log("\nSelamat Datang di Aplikasi Pemesanan Mixue\n")
    console.log("1. Cari Menu")
    console.log("2. Lihat Keranjang")
    console.log("3. Lihat History")
    console.log("4. EXIT\n")

    rl.question("Masukkan Input: ", (input) => {
        input = parseInt(input)
        switch (input) {
            case 1:
                cariMenu()
                break
            case 2:
                lihatKeranjang()
                break
            case 3:
                lihatHistory()
                break
            case 4:
                keluar()
                break
            default:
                rl.question("\n *Input tidak sesuai yang diharapkan*", () => {
                    menuUtama()
                })
                break
        }
    })
}

const cariMenu = () => {
    console.clear()
    console.log(" --- Daftar Menu MIXUE --- \n")
    let count = 0
    while (daftarMenu[count] !== undefined){
        console.log(` ${count+1}. ${daftarMenu[count].nama}, Harga: ${daftarMenu[count].harga}`)
        count++
    }
    console.log(" 99. Kembali ke menu utama")
    console.log(`\n -------------------------\n`)

    rl.question(` Masukkan no menu yang dipilih (1-${count}): `, (input) => {
        input = parseInt(input)
        if (input === 99){
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
                            cariMenu()
                            break
                        case "n":
                        case "N":
                            menuUtama()
                            break
                        default:
                            rl.question("\n *Input tidak sesuai yang diharapkan*", () => {
                                cariMenu()
                            })
                            break
                    }
                })
            })
        } else {
            rl.question("\n *Input tidak sesuai yang diharapkan*", () => {
                cariMenu()
            })
        }
    })
}

const lihatKeranjang = () => {
    console.clear()
    console.log(" --- Daftar Keranjang --- \n")
    if (daftarKeranjang[0] === undefined){
        rl.question("\n *Keranjang masih kosong*\n", (input) => {
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
        console.log(`\n -------------------------\n`)
        console.log(` Total Pesanan: ${totalAll}\n`)
        
        rl.question(" Lakukan pemesanan (y/n)? ", (input) => {
            switch (input) {
                case "y":
                case "Y":
                    console.clear()
                    rl.question(`\n Anda yakin ingin melakukan pemesanan dengan total ${totalAll} (y/n)? `, (input) => {
                        switch (input) {
                            case "y":
                            case "Y":
                                daftarHistory = [ ...daftarHistory, ...daftarKeranjang]
                                daftarKeranjang = []
                                rl.question("\n *Selamat anda berhasil melakukan pemesanan*\n \n Silahkan lakukan pembayaran di kasir ", () => {
                                    menuUtama()
                                })
                                break
                            case "n":
                            case "N":
                                lihatKeranjang()
                                break
                            default:
                                rl.question("\n *Input tidak sesuai yang diharapkan*", () => {
                                    lihatKeranjang()
                                })
                                break
                        }
                    })
                    break
                case "n":
                case "N":
                    menuUtama()
                    break
                default:
                    rl.question("\n *Input tidak sesuai yang diharapkan*", () => {
                        lihatKeranjang()
                    })
                    break
            }
        })
    }
}

const lihatHistory = () => {
    console.clear()
    console.log(" --- Daftar History Pemesanan --- \n")
    if (daftarHistory[0] === undefined){
        rl.question("\n *History Pemesanan masih kosong*\n", (input) => {
            menuUtama()
        })
    } else {
        let count = 0
        while (daftarHistory[count] !== undefined){
            console.table(` ${count+1}. ${daftarHistory[count].nama}, Harga: ${daftarHistory[count].harga}, Jumlah: ${daftarHistory[count].qty}, Subtotal: ${daftarHistory[count].subTotal}`)
            count++
        }
        console.log(`\n -------------------------\n`)

        rl.question(" ",() => {
            menuUtama()
        })
    }
}

const keluar = () => {
    console.clear()
    if (daftarKeranjang[0] !== undefined){
        rl.question(" Masih ada item di keranjang, apakah anda ingin membatalkannya (y/n)? ", (input) => {
            switch (input) {
                case "y":
                case "Y":
                    rl.close
                    break
                case "n":
                case "N":
                    menuUtama()
                    break
                default:
                    break
            }
        })
    } else if(daftarHistory[0] !== undefined){
        console.log("\n Selamat menikmati☺️\n")
        rl.close()
    } else {
        rl.question("\n Yakin ga mesen dulu nih (y/n)? ", (input) => {
            switch (input) {
                case "y":
                case "Y":
                    rl.close
                    break
                case "n":
                case "N":
                    menuUtama()
                    break
                default:
                    break
            }
        })
    }
}

menuUtama()
