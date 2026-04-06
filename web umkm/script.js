// Konfigurasi Google Apps Script
// Ganti dengan URL Web App dari Google Apps Script Anda
const APPS_SCRIPT_URL = 'YOUR_WEB_APP_URL';

// Fungsi untuk format harga
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
}

// Fungsi untuk membuat card menu
function createMenuCard(item) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1';
    
    card.innerHTML = `
        <div class="relative">
            <img src="${item.image || 'https://via.placeholder.com/400x300?text=Nasi+Krawu'}" 
                 alt="${item.name}" 
                 class="w-full h-48 object-cover">
            ${item.isAvailable === 'Tidak' ? '<div class="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center"><span class="text-white font-bold text-xl">Habis</span></div>' : ''}
        </div>
        <div class="p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-2">${item.name}</h3>
            <p class="text-gray-600 mb-4">${item.description}</p>
            <div class="flex items-center justify-between">
                <span class="text-2xl font-bold text-orange-600">${formatPrice(item.price)}</span>
                ${item.isAvailable !== 'Tidak' ? 
                    '<button class="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"><i class="fas fa-shopping-cart mr-2"></i>Pesan</button>' : 
                    '<button class="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed" disabled>Habis</button>'
                }
            </div>
        </div>
    `;
    
    return card;
}

// Fungsi untuk memuat data dari Google Apps Script
async function loadMenuFromSheets() {
    const loading = document.getElementById('loading');
    const menuGrid = document.getElementById('menuGrid');
    const error = document.getElementById('error');
    
    // Cek apakah URL sudah dikonfigurasi
    if (APPS_SCRIPT_URL === 'YOUR_WEB_APP_URL') {
        console.warn('Apps Script URL belum dikonfigurasi, menggunakan menu dummy');
        loading.classList.add('hidden');
        loadDummyMenu();
        return;
    }
    
    try {
        const response = await fetch(APPS_SCRIPT_URL);
        
        if (!response.ok) {
            throw new Error('Gagal mengambil data');
        }
        
        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.error || 'Gagal memuat data');
        }
        
        const menuItems = result.data;
        
        // Tampilkan menu
        loading.classList.add('hidden');
        menuGrid.classList.remove('hidden');
        
        if (menuItems.length === 0) {
            error.classList.remove('hidden');
            error.innerHTML = `
                <i class="fas fa-info-circle text-4xl text-orange-600"></i>
                <p class="mt-4 text-gray-600">Belum ada menu tersedia</p>
            `;
            return;
        }
        
        menuItems.forEach(item => {
            const card = createMenuCard(item);
            menuGrid.appendChild(card);
        });
        
    } catch (err) {
        console.error('Error:', err);
        loading.classList.add('hidden');
        error.classList.remove('hidden');
        
        // Fallback: tampilkan menu dummy jika gagal load dari sheets
        loadDummyMenu();
    }
}

// Fungsi untuk memuat menu dummy (fallback)
function loadDummyMenu() {
    const menuGrid = document.getElementById('menuGrid');
    const error = document.getElementById('error');
    
    error.classList.add('hidden');
    menuGrid.classList.remove('hidden');
    
    const dummyMenu = [
        {
            name: 'Nasi Krawu Komplit',
            description: 'Nasi putih dengan daging sapi krawu, sambal terasi, dan serundeng',
            price: 25000,
            image: 'https://via.placeholder.com/400x300?text=Nasi+Krawu+Komplit',
            isAvailable: 'Ya'
        },
        {
            name: 'Nasi Krawu Biasa',
            description: 'Nasi putih dengan daging sapi krawu dan sambal terasi',
            price: 20000,
            image: 'https://via.placeholder.com/400x300?text=Nasi+Krawu+Biasa',
            isAvailable: 'Ya'
        },
        {
            name: 'Nasi Krawu Jumbo',
            description: 'Porsi besar dengan daging sapi krawu extra, sambal, dan serundeng',
            price: 35000,
            image: 'https://via.placeholder.com/400x300?text=Nasi+Krawu+Jumbo',
            isAvailable: 'Ya'
        },
        {
            name: 'Sate Krawu',
            description: 'Sate daging sapi krawu dengan bumbu kacang khas',
            price: 15000,
            image: 'https://via.placeholder.com/400x300?text=Sate+Krawu',
            isAvailable: 'Ya'
        },
        {
            name: 'Es Teh Manis',
            description: 'Teh manis dingin segar',
            price: 5000,
            image: 'https://via.placeholder.com/400x300?text=Es+Teh',
            isAvailable: 'Ya'
        },
        {
            name: 'Es Jeruk',
            description: 'Jeruk peras segar dengan es',
            price: 8000,
            image: 'https://via.placeholder.com/400x300?text=Es+Jeruk',
            isAvailable: 'Ya'
        }
    ];
    
    dummyMenu.forEach(item => {
        const card = createMenuCard(item);
        menuGrid.appendChild(card);
    });
}

// Smooth scroll untuk navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Load menu saat halaman dimuat
document.addEventListener('DOMContentLoaded', loadMenuFromSheets);
