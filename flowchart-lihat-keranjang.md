# FLowchart Lihat Keranjang

```mermaid
---
    title: Lihat Keranjang
---
flowchart TD
    start@{shape: circle, label: start}
    stop@{shape: dbl-circ, label: stop}
    consoleClear1@{shape: rect, label: "console.clear()"}
    outputJudul@{shape: lean-r, label: '"--- Daftar Keranjang ---"'}
    cekKeranjangKosong@{shape: diamond, label: "daftarKeranjang[0] = undefined"}
    outputKosong@{shape: lean-r, label: '"Keranjang masih kosong"'}
    inputKosong1@{shape: lean-r, label: Click Enter}
    callMenuUtama1@{shape: rect, label: "menuUtama()"}
    count@{shape: rect, label: count = 0}
    totalAll@{shape: rect, label: totalAll = 0}
    cekKeranjangMasihAda@{shape: diamond, label: "daftarKeranjang[count] != undefined"}
    sumTotal@{shape: rect, label: "totalAll += daftarKeranjang[count].subTotal"}
    outputKeranjang@{shape: lean-r, label: "'${count+1}. ${daftarKeranjang[count].nama}, Harga: ${daftarKeranjang[count].harga}, Jumlah: ${daftarKeranjang[count].qty}, Subtotal: ${daftarKeranjang[count].subTotal}'"}
    countPlus@{shape: rect, label: count++}
    outputBatasBawah@{shape: lean-r, label: '"-------------------------"'}
    outputTotalAll@{shape: lean-r, label: "'Total Pesanan: ${totalAll}'"}
    outputLakukanPesan@{shape: lean-r, label: '"Lakukan pemesanan (y/n)? "'}
    input@{shape: lean-r, label: input}
    cekInputY@{shape: diamond, label: input = "y"}
    cekInputYKapital@{shape: diamond, label: input = "Y"}
    cekInputN@{shape: diamond, label: input = "n"}
    cekInputNKapital@{shape: diamond, label: input = "N"}
    consoleClear2@{shape: rect, label: "console.clear()"}
    outputConfirm@{shape: lean-r, label: '"Anda yakin ingin melakukan pemesanan dengan total ${totalAll} (y/n)? "'}
    inputConfirm@{shape: lean-r, label: inputConfirm}
    callMenuUtama2@{shape: rect, label: "menuUtama()"}
    break1@{shape: rect, label: break}
    outputError1@{shape: lean-r, label: '"Input tidak sesuai yang diharapkan"'}
    inputKosong2@{shape: lean-r, label: Click Enter}
    callLihatKeranjang1@{shape: rect, label: "lihatKeranjang()"}
    break2@{shape: rect, label: break}
    cekConfirmY@{shape: diamond, label: inputConfirm = "y"}
    cekConfirmYKapital@{shape: diamond, label: inputConfirm = "Y"}
    cekConfirmN@{shape: diamond, label: inputConfirm = "n"}
    cekConfirmNKapital@{shape: diamond, label: inputConfirm = "N"}
    break3@{shape: rect, label: break}
    break4@{shape: rect, label: break}
    break5@{shape: rect, label: break}
    assignDaftarHistory@{shape: rect, label: "daftarHistory = [ ...daftarHistory, ...daftarKeranjang ]"}
    assignDaftarKeranjang@{shape: rect, label: "daftarKeranjang = []"}
    outputBerhasil@{shape: lean-r, label: '"Selamat anda berhasil melakukan pemesanan\n \n Silahkan lakukan pembayaran di kasir"'}
    inputKosong3@{shape: lean-r, label: Click Enter}
    callMenuUtama3@{shape: rect, label: "menuUtama()"}
    callLihatKeranjang2@{shape: rect, label: "lihatKeranjang()"}
    outputError2@{shape: lean-r, label: '"Input tidak sesuai yang diharapkan"'}
    callLihatKeranjang3@{shape: rect, label: "lihatKeranjang()"}


    start --> consoleClear1 --> outputJudul --> cekKeranjangKosong -- true --> outputKosong --> inputKosong1 --> callMenuUtama1 --> stop
    cekKeranjangKosong -- false --> count --> totalAll --> cekKeranjangMasihAda -- true --> sumTotal --> outputKeranjang --> countPlus --> cekKeranjangMasihAda
    cekKeranjangMasihAda -- false --> outputBatasBawah --> outputTotalAll --> outputLakukanPesan --> input --> cekInputY -- true --> consoleClear2 --> outputConfirm --> inputConfirm
    cekInputY -- false --> cekInputYKapital -- true --> consoleClear2
    cekInputYKapital -- false --> cekInputN -- true --> callMenuUtama2--> break1
    cekInputN -- false --> cekInputNKapital -- true --> callMenuUtama2
    cekInputNKapital -- false --> outputError1 --> inputKosong2 --> callLihatKeranjang1 --> break2
    inputConfirm --> cekConfirmY -- true --> assignDaftarHistory --> assignDaftarKeranjang --> outputBerhasil --> inputKosong3 --> callMenuUtama3 --> break3
    cekConfirmY -- false --> cekConfirmYKapital -- true --> assignDaftarHistory
    cekConfirmYKapital -- false --> cekConfirmN -- true --> callLihatKeranjang2 --> break4
    cekConfirmN -- false --> cekConfirmNKapital -- true --> callLihatKeranjang2
    cekConfirmNKapital -- false --> outputError2 --> callLihatKeranjang3 --> break5

    break1 --> stop
    break2 --> stop
    break3 --> stop
    break4 --> stop
    break5 --> stop

```
