const listMenu = [
  {
    name: "Mixue Ice Cream",
    price: 8000,
  },
  {
    name: "BOBA Sundae",
    price: 16000,
  },
  {
    name: "Strawberry Mi-Shake",
    price: 16000,
  },
  {
    name: "BOBA Mi-Shake",
    price: 16000,
  },
  {
    name: "Chocolate Cookies Smoothies",
    price: 16000,
  },
  {
    name: "Brown Sugar Pearl Milk Tea",
    price: 19000,
  },
  {
    name: "Pearl Milk Tea",
    price: 22000,
  },
  {
    name: "Oats Milk Tea",
    price: 22000,
  },
  {
    name: "Coconut Jelly Milk Tea",
    price: 22000,
  },
  {
    name: "Red Bean Milk Tea",
    price: 22000,
  },
  {
    name: "Fresh Squeezed Lemonade",
    price: 10000,
  },
  {
    name: "Peach Earl Grey Tea",
    price: 16000,
  },
  {
    name: "Original Jasmine Tea",
    price: 10000,
  },
  {
    name: "Original Earl Grey Tea",
    price: 10000,
  },
];

let carts = [];
let histories = [];

const readLine = require("node:readline");
const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Fungsi helper untuk menampilkan prompt dan menjalankan callback
 * @param {string} message - Pesan yang ditampilkan
 * @param {function} callback - Fungsi callback yang dijalankan setelah input
 */
const interfaceInput = (message, callback) => {
  rl.question(message, callback);
};

/**
 * Fungsi helper untuk validasi input tidak sesuai
 * @param {string} message - Pesan error (optional)
 * @param {function} callbackRetry - Fungsi yang akan dipanggil kembali
 */
const handleInvalidInput = (
  message = "\n *Input tidak sesuai yang diharapkan*",
  callbackRetry
) => {
  interfaceInput(message, () => {
    callbackRetry();
  });
};

/**
 * Fungsi helper untuk konfirmasi y/n
 * @param {string} message - Pesan konfirmasi
 * @param {function} callbackYes - Callback jika pilih 'y' atau 'Y'
 * @param {function} callbackNo - Callback jika pilih 'n' atau 'N'
 * @param {function} callbackRetry - Callback jika input tidak sesuai
 */
const confirmInput = (message, callbackYes, callbackNo, callbackRetry) => {
  interfaceInput(message, (input) => {
    switch (input) {
      case "y":
      case "Y":
        callbackYes();
        break;
      case "n":
      case "N":
        callbackNo();
        break;
      default:
        handleInvalidInput(undefined, callbackRetry);
    }
  });
};

/**
 * Menu utama aplikasi
 * Menampilkan pilihan: Pilih Menu, Lihat Keranjang, Lihat History, EXIT
 */
const mainMenu = () => {
  console.clear();
  console.log("\nSelamat Datang di Aplikasi Pemesanan Mixue\n");
  console.log("1. Pilih Menu");
  console.log("2. Lihat Keranjang");
  console.log("3. Lihat History");
  console.log("4. EXIT\n");

  interfaceInput("Masukkan Input: ", (input) => {
    input = parseInt(input);
    switch (input) {
      case 1:
        selectMenu();
        break;
      case 2:
        showCart();
        break;
      case 3:
        showHistory();
        break;
      case 4:
        exit();
        break;
      default:
        handleInvalidInput(undefined, mainMenu);
    }
  });
};

/**
 * Fungsi untuk memilih menu dan menambahkan ke keranjang
 */
const selectMenu = () => {
  console.clear();
  console.log(" --- Daftar Menu MIXUE --- \n");
  let count = 0;
  while (listMenu[count] !== undefined) {
    const { name, price } = listMenu[count];
    console.log(` ${count + 1}. ${name}, Harga: ${price}`);
    count++;
  }
  console.log(" 99. Kembali ke menu utama");
  console.log(`\n -------------------------\n`);

  interfaceInput(` Masukkan no menu yang dipilih (1-${count}): `, (input) => {
    input = parseInt(input);
    if (input === 99) {
      mainMenu();
    } else if (input > 0 && input <= count) {
      input -= 1;
      interfaceInput(" Masukkan jumlah pesanan: ", (inputQty) => {
        inputQty = parseInt(inputQty);
        if (inputQty > 0) {
          let dataSelectedMenu = {
            ...listMenu[input],
            ...{
              qty: inputQty,
            },
            ...{
              subTotal: listMenu[input].price * inputQty,
            },
          };
          if (carts[0] !== undefined) {
            let count = 0;
            let flag = false;
            while (carts[count] !== undefined) {
              if (dataSelectedMenu.name === carts[count].name) {
                carts[count] = dataSelectedMenu;
                flag = true;
              }
              count++;
            }
            if (flag === false) {
              carts = [...carts, ...[dataSelectedMenu]];
            }
          } else {
            carts = [...carts, ...[dataSelectedMenu]];
          }
          console.log(
            `\n *${dataSelectedMenu.name} sejumlah ${dataSelectedMenu.qty} berhasil ditambahkan ke keranjang*\n`
          );
          confirmInput(
            " Ingin memilih menu lagi (y/n)? ",
            selectMenu,
            mainMenu,
            selectMenu
          );
        } else if (inputQty === 0) {
          handleInvalidInput(" Input tidak boleh 0 ", selectMenu);
        } else {
          handleInvalidInput(undefined, selectMenu);
        }
      });
    } else {
      handleInvalidInput(undefined, selectMenu);
    }
  });
};

/**
 * Fungsi untuk menampilkan isi keranjang dan melakukan checkout
 */
const showCart = () => {
  console.clear();
  console.log(" --- Daftar Keranjang --- \n");
  if (carts[0] === undefined) {
    interfaceInput("\n *Keranjang masih kosong*\n", () => {
      mainMenu();
    });
  } else {
    let count = 0;
    let totalAll = 0;
    while (carts[count] !== undefined) {
      const { name, price, qty, subTotal } = carts[count];
      totalAll += subTotal;
      console.log(
        ` ${
          count + 1
        }. ${name}, Harga: ${price}, Jumlah: ${qty}, Subtotal: ${subTotal}`
      );
      count++;
    }
    console.log(`\n -------------------------\n`);
    console.log(` Total Pesanan: ${totalAll}\n`);

    interfaceInput(" Lakukan pemesanan (y/n)? ", (input) => {
      switch (input) {
        case "y":
        case "Y":
          console.clear();
          confirmInput(
            `\n Anda yakin ingin melakukan pemesanan dengan total ${totalAll} (y/n)? `,
            () => {
              histories = [...histories, ...carts];
              carts = [];
              interfaceInput(
                "\n *Selamat anda berhasil melakukan pemesanan*\n \n Silahkan lakukan pembayaran di kasir ",
                () => {
                  mainMenu();
                }
              );
            },
            showCart,
            showCart
          );
          break;
        case "n":
        case "N":
          mainMenu();
          break;
        default:
          handleInvalidInput(undefined, showCart);
      }
    });
  }
};

/**
 * Fungsi untuk menampilkan history pemesanan
 */
const showHistory = () => {
  console.clear();
  console.log(" --- Daftar History Pemesanan --- \n");
  if (histories[0] === undefined) {
    interfaceInput("\n *History Pemesanan masih kosong*\n", () => {
      mainMenu();
    });
  } else {
    let count = 0;
    while (histories[count] !== undefined) {
      const { name, price, qty, subTotal } = histories[count];
      console.log(
        ` ${
          count + 1
        }. ${name}, Harga: ${price}, Jumlah: ${qty}, Subtotal: ${subTotal}`
      );
      count++;
    }

    interfaceInput(" \n -------------------------\n", () => {
      mainMenu();
    });
  }
};

/**
 * Fungsi untuk keluar dari aplikasi
 */
const exit = () => {
  console.clear();
  if (carts[0] !== undefined) {
    confirmInput(
      " Masih ada item di keranjang, apakah anda ingin membatalkannya (y/n)? ",
      () => {
        rl.close();
      },
      mainMenu,
      exit
    );
  } else if (histories[0] !== undefined) {
    confirmInput(
      "\n Anda yakin ingin exit (y/n)? ",
      () => {
        console.log("\n Selamat menikmati☺️\n");
        rl.close();
      },
      mainMenu,
      exit
    );
  } else {
    confirmInput(
      "\n Yakin ga mesen dulu nih (y/n)? ",
      () => {
        rl.close();
      },
      mainMenu,
      exit
    );
  }
};

mainMenu();
