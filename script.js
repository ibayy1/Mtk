
/* =========================================
   THE ART OF ANNUITY
   JavaScript - Annuity Calculator
========================================= */


// =========================================
// 1. MENGAMBIL ELEMEN HTML
// =========================================

const annuityForm = document.getElementById("annuityForm");

const principalInput = document.getElementById("principal");
const interestInput = document.getElementById("interest");
const durationInput = document.getElementById("duration");

const monthlyPayment = document.getElementById("monthlyPayment");
const totalPayment = document.getElementById("totalPayment");
const totalInterest = document.getElementById("totalInterest");

const resetButton = document.getElementById("resetButton");


// =========================================
// 2. FORMAT MATA UANG RUPIAH
// =========================================

function formatRupiah(amount) {

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(amount);

}


// =========================================
// 3. FUNGSI MENGHITUNG ANUITAS
// =========================================

function calculateAnnuity(principal, annualInterest, years) {

    // Mengubah bunga tahunan menjadi bunga bulanan
    const monthlyInterest = annualInterest / 100 / 12;

    // Menghitung jumlah periode pembayaran
    const totalPeriods = years * 12;

    let installment;

    // Jika bunga 0%, pembayaran tanpa bunga
    if (monthlyInterest === 0) {

        installment = principal / totalPeriods;

    } else {

        // Rumus anuitas
        installment =
            principal *
            monthlyInterest /
            (1 - Math.pow(1 + monthlyInterest, -totalPeriods));

    }

    // Menghitung total pembayaran
    const total = installment * totalPeriods;

    // Menghitung total bunga
    const interest = total - principal;

    return {
        installment: installment,
        total: total,
        interest: interest
    };

}


// =========================================
// 4. MENAMPILKAN HASIL PERHITUNGAN
// =========================================

annuityForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Mengambil nilai input
    const principal = Number(principalInput.value);
    const annualInterest = Number(interestInput.value);
    const years = Number(durationInput.value);

    // Validasi input
    if (
        !Number.isFinite(principal) ||
        !Number.isFinite(annualInterest) ||
        !Number.isFinite(years) ||
        principal <= 0 ||
        annualInterest < 0 ||
        years <= 0 ||
        !Number.isInteger(years)
    ) {

        alert("Mohon masukkan data pinjaman yang valid.");

        return;

    }

    // Menghitung anuitas
    const result = calculateAnnuity(
        principal,
        annualInterest,
        years
    );

    // Menampilkan hasil
    monthlyPayment.textContent =
        formatRupiah(result.installment);

    totalPayment.textContent =
        formatRupiah(result.total);

    totalInterest.textContent =
        formatRupiah(result.interest);

});


// =========================================
// 5. FUNGSI RESET KALKULATOR
// =========================================

resetButton.addEventListener("click", function() {

    // Mengembalikan hasil ke kondisi awal
    monthlyPayment.textContent = "Rp 0";

    totalPayment.textContent = "Rp 0";

    totalInterest.textContent = "Rp 0";

});


// =========================================
// 6. EFEK ANIMASI HASIL
// =========================================

const resultPanel = document.querySelector(".result-panel");

annuityForm.addEventListener("submit", function() {

    resultPanel.style.animation = "none";

    void resultPanel.offsetWidth;

    resultPanel.style.animation = "fadeUp 0.6s ease";

});
