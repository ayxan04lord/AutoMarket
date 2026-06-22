// ==================== DEFAULT CAR DATA ====================
const DEFAULT_CARS = [
    { id:1, title:"BMW 5 Series", sub:"2021 • 520d xDrive", year:2021, km:"48,000", fuel:"Dizel", trans:"Avtomat", color:"Qara", engine:"2.0L Turbo", power:"190 at", price:"62500", location:"Bakı", badge:"hot", badgeText:"🔥 Populyar", img:"https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80", desc:"Möhtəşəm vəziyyətdə BMW 5 seriyası. Tam avadanlıqlı, yeni texniki baxış keçirilmiş. Dəri salon, panorama dam, park kameraları mövcuddur.", owner:"admin" },
    { id:2, title:"Mercedes-Benz E-Class", sub:"2020 • E220d", year:2020, km:"67,000", fuel:"Dizel", trans:"Avtomat", color:"Gümüşü", engine:"2.0L Turbo", power:"194 at", price:"58000", location:"Bakı", badge:"used", badgeText:"İşlənmiş", img:"https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80", desc:"Azaldılmış qiymətə Mercedes E-Class. AMG paketi, surround view kamera sistemi, aktiv sürücü yardımçısı. Heç bir problem yoxdur.", owner:"admin" },
    { id:3, title:"Toyota RAV4", sub:"2023 • Hybrid", year:2023, km:"12,000", fuel:"Hibrid", trans:"Avtomat", color:"Ağ", engine:"2.5L Hybrid", power:"222 at", price:"49900", location:"Gəncə", badge:"new", badgeText:"✨ Yeni", img:"https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80", desc:"Praktik yeni Toyota RAV4 Hybrid. Tam elektrik rejimli şəhər sürüşü üçün idealdır. Azalacaq yanacaq xərci, yüksək etibarlılıq.", owner:"admin" },
    { id:4, title:"Hyundai Tucson", sub:"2022 • 1.6 T-GDi", year:2022, km:"28,500", fuel:"Benzin", trans:"Avtomat", color:"Göy", engine:"1.6L Turbo", power:"150 at", price:"32000", location:"Sumqayıt", badge:"used", badgeText:"İşlənmiş", img:"https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80", desc:"Ailə üçün mükəmməl Hyundai Tucson. Geniş bagaj sahəsi, tam avadanlıqlı.", owner:"admin" },
    { id:5, title:"Tesla Model 3", sub:"2022 • Long Range", year:2022, km:"31,000", fuel:"Elektrik", trans:"Avtomat", color:"Qırmızı", engine:"Dual Motor", power:"346 at", price:"54000", location:"Bakı", badge:"hot", badgeText:"⚡ Elektrik", img:"https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&q=80", desc:"Tesla Model 3 Long Range. 500+ km menzil, sürətlənmə 0-100 km/s 4.4 san. Autopilot, premium audio sistemi.", owner:"admin" },
    { id:6, title:"Kia Sportage", sub:"2023 • 2.0 MPI", year:2023, km:"9,000", fuel:"Benzin", trans:"Avtomat", color:"Yaşıl", engine:"2.0L MPI", power:"150 at", price:"28500", location:"Bakı", badge:"new", badgeText:"✨ Yeni", img:"https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80", desc:"Cəlbedici dizaynlı yeni nəsil Kia Sportage. Böyük 12.3' ekran, qızdırılan oturacaqlar.", owner:"admin" },
    { id:7, title:"Audi A6", sub:"2019 • 3.0 TDI Quattro", year:2019, km:"85,000", fuel:"Dizel", trans:"Avtomat", color:"Qara", engine:"3.0L V6 TDI", power:"286 at", price:"45000", location:"Bakı", badge:"used", badgeText:"İşlənmiş", img:"https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&q=80", desc:"Güclü Audi A6 quattro. Matrix LED farlar, B&O ses sistemi, virtual kokpit.", owner:"admin" },
    { id:8, title:"Volkswagen Passat", sub:"2021 • 1.5 TSI", year:2021, km:"42,000", fuel:"Benzin", trans:"Avtomat", color:"Bej", engine:"1.5L TSI", power:"150 at", price:"29900", location:"Lənkəran", badge:"used", badgeText:"İşlənmiş", img:"https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80", desc:"Rahat ailə avtomobili Volkswagen Passat. Geniş salon, düşük yanacaq sərfi. Uzun yol üçün ideal.", owner:"admin" }
];

// ==================== STATE ====================
let currentFilter = 'all';
let currentSort   = 'newest';
let heroSearch    = { marka:'', fuel:'', price:'' };
let currentUser   = null;
let favorites     = [];   // array of car ids

// ==================== HELPERS ====================
function getCars() {
    const stored = JSON.parse(localStorage.getItem('automarket_cars') || '[]');
    return [...DEFAULT_CARS, ...stored];
}

function getUserAds() {
    const stored = JSON.parse(localStorage.getItem('automarket_cars') || '[]');
    return stored.filter(c => c.owner === currentUser.username);
}

function saveCars(arr) {
    // only save user-added cars (not defaults)
    localStorage.setItem('automarket_cars', JSON.stringify(arr));
}

function getUsers() {
    return JSON.parse(localStorage.getItem('automarket_users') || '[]');
}

function saveUsers(arr) {
    localStorage.setItem('automarket_users', JSON.stringify(arr));
}

function formatPrice(p) {
    return Number(p).toLocaleString('en-US');
}

function loadFavorites() {
    if (!currentUser) return;
    favorites = JSON.parse(localStorage.getItem('fav_' + currentUser.username) || '[]');
}

function saveFavorites() {
    localStorage.setItem('fav_' + currentUser.username, JSON.stringify(favorites));
}

function isFav(id) { return favorites.includes(id); }

// ==================== AUTH ====================
function switchTab(tab) {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(t => t.classList.remove('active'));
    document.getElementById('loginForm').classList.toggle('hidden', tab !== 'login');
    document.getElementById('registerForm').classList.toggle('hidden', tab !== 'register');
    tabs[tab === 'login' ? 0 : 1].classList.add('active');
    clearErrors();
}

function clearErrors() {
    ['loginError','registerError','registerSuccess'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = '';
    });
}

function togglePass(inputId, btn) {
    const input = document.getElementById(inputId);
    input.type = input.type === 'password' ? 'text' : 'password';
    btn.textContent = input.type === 'password' ? '👁' : '🙈';
}

function login() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const errorEl  = document.getElementById('loginError');
    if (!username || !password) { errorEl.textContent = '⚠️ Bütün xanaları doldurun.'; return; }

    const allUsers = [{ username:'admin', password:'123456', name:'Admin', email:'admin@automarket.az', joined: '2024-01-01' }, ...getUsers()];
    const found = allUsers.find(u => u.username === username && u.password === password);

    if (found) {
        currentUser = found;
        localStorage.setItem('automarket_session', JSON.stringify(found));
        loadFavorites();
        showSite();
    } else {
        errorEl.textContent = '❌ İstifadəçi adı və ya şifrə yanlışdır.';
    }
}

function register() {
    const name     = document.getElementById('regName').value.trim();
    const username = document.getElementById('regUsername').value.trim();
    const email    = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirm  = document.getElementById('regConfirm').value;
    const errorEl  = document.getElementById('registerError');
    const successEl= document.getElementById('registerSuccess');
    errorEl.textContent = ''; successEl.textContent = '';

    if (!name || !username || !password || !confirm) { errorEl.textContent = '⚠️ Məcburi xanaları doldurun.'; return; }
    if (password.length < 6)  { errorEl.textContent = '⚠️ Şifrə ən azı 6 simvol olmalıdır.'; return; }
    if (password !== confirm)  { errorEl.textContent = '❌ Şifrələr uyğun gəlmir.'; return; }

    const users = getUsers();
    if (users.find(u => u.username === username) || username === 'admin') {
        errorEl.textContent = '❌ Bu istifadəçi adı artıq mövcuddur.'; return;
    }

    const newUser = { username, password, name, email, joined: new Date().toISOString().split('T')[0] };
    users.push(newUser);
    saveUsers(users);
    successEl.textContent = '✅ Qeydiyyat uğurlu oldu!';

    setTimeout(() => {
        ['regName','regUsername','regEmail','regPassword','regConfirm'].forEach(id => document.getElementById(id).value = '');
        switchTab('login');
        document.getElementById('loginUsername').value = username;
    }, 1400);
}

function logout() {
    localStorage.removeItem('automarket_session');
    currentUser = null; favorites = [];
    location.reload();
}

// ==================== SITE INIT ====================
function showSite() {
    document.getElementById('authContainer').style.display = 'none';
    document.body.classList.remove('auth-page');
    document.getElementById('siteWrapper').classList.remove('hidden');

    const name = currentUser.name || currentUser.username;
    document.getElementById('userInitial').textContent  = name.charAt(0).toUpperCase();
    document.getElementById('dropdownName').textContent = name;

    showPage('listings', document.querySelector('.nav-link'));
}

function showPage(page, linkEl) {
    ['listings','favorites','myads'].forEach(p => {
        document.getElementById('page-' + p).classList.toggle('hidden', p !== page);
    });
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    if (linkEl) linkEl.classList.add('active');

    if (page === 'listings')  renderCards();
    if (page === 'favorites') renderFavorites();
    if (page === 'myads')     renderMyAds();

    document.getElementById('userDropdown').classList.add('hidden');
}

// ==================== FILTER & SORT ====================
function setFilter(btn, filter) {
    document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = filter;
    heroSearch = { marka:'', fuel:'', price:'' };  // reset hero search
    document.getElementById('heroMarka').value = '';
    document.getElementById('heroFuel').value  = '';
    document.getElementById('heroPrice').value = '';
    renderCards();
}

function applyHeroSearch() {
    currentFilter = 'all';
    document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
    document.querySelector('[data-filter="all"]').classList.add('active');
    heroSearch.marka = document.getElementById('heroMarka').value;
    heroSearch.fuel  = document.getElementById('heroFuel').value;
    heroSearch.price = document.getElementById('heroPrice').value;
    renderCards();
}

function applySort() {
    currentSort = document.getElementById('sortSelect').value;
    renderCards();
}

function resetFilters() {
    currentFilter = 'all';
    heroSearch = { marka:'', fuel:'', price:'' };
    document.getElementById('heroMarka').value = '';
    document.getElementById('heroFuel').value  = '';
    document.getElementById('heroPrice').value = '';
    document.getElementById('sortSelect').value = 'newest';
    currentSort = 'newest';
    document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
    document.querySelector('[data-filter="all"]').classList.add('active');
    renderCards();
}

function applyFiltersAndSort(list) {
    let result = [...list];

    // filter tag
    if (currentFilter !== 'all') {
        result = result.filter(c => {
            if (currentFilter === 'new')  return c.badge === 'new';
            if (currentFilter === 'used') return c.badge === 'used';
            if (currentFilter === 'hot')  return c.badge === 'hot';
            return c.fuel === currentFilter;
        });
    }

    // hero search: marka
    if (heroSearch.marka) {
        result = result.filter(c => c.title.toLowerCase().includes(heroSearch.marka.toLowerCase()));
    }
    // hero search: fuel
    if (heroSearch.fuel) {
        result = result.filter(c => c.fuel === heroSearch.fuel);
    }
    // hero search: price range
    if (heroSearch.price) {
        const [min, max] = heroSearch.price.split('-').map(Number);
        result = result.filter(c => {
            const p = Number(String(c.price).replace(/,/g,''));
            return p >= min && p <= max;
        });
    }

    // sort
    result.sort((a, b) => {
        const pa = Number(String(a.price).replace(/,/g,''));
        const pb = Number(String(b.price).replace(/,/g,''));
        if (currentSort === 'price-asc')  return pa - pb;
        if (currentSort === 'price-desc') return pb - pa;
        if (currentSort === 'year-desc')  return b.year - a.year;
        if (currentSort === 'year-asc')   return a.year - b.year;
        return b.id - a.id; // newest first (highest id)
    });

    return result;
}

// ==================== RENDER CARDS ====================
function buildCardHTML(car, showDelete) {
    const fav = isFav(car.id);
    const priceNum = Number(String(car.price).replace(/,/g,''));
    return `
        <div class="car-card" onclick="openModal(${car.id})">
            <div class="card-image">
                <img src="${car.img || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80'}" alt="${car.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80'">
                <span class="card-badge badge-${car.badge}">${car.badgeText}</span>
                <button class="card-fav ${fav ? 'active' : ''}" onclick="toggleFav(event,${car.id})" title="Seçilmişlərə əlavə et">${fav ? '❤️' : '♡'}</button>
                ${showDelete ? `<button class="card-delete" onclick="deleteAd(event,${car.id})" title="Sil">🗑</button>` : ''}
            </div>
            <div class="card-body">
                <div class="card-title">${car.title}</div>
                <div class="card-sub">${car.sub}</div>
                <div class="card-specs">
                    <span class="spec-chip">📅 ${car.year}</span>
                    <span class="spec-chip">🛣 ${car.km} km</span>
                    <span class="spec-chip">⛽ ${car.fuel}</span>
                    <span class="spec-chip">⚙️ ${car.trans}</span>
                </div>
                <div class="card-footer">
                    <div class="card-price">${formatPrice(priceNum)} $ <span>USD</span></div>
                    <div class="card-location">📍 ${car.location}</div>
                </div>
            </div>
        </div>`;
}

function renderCards() {
    const all = getCars();
    const filtered = applyFiltersAndSort(all);
    const grid = document.getElementById('cardsGrid');
    const empty = document.getElementById('emptyState');
    document.getElementById('resultsCount').textContent = filtered.length + ' nəticə';

    if (filtered.length === 0) {
        grid.innerHTML = '';
        empty.classList.remove('hidden');
    } else {
        empty.classList.add('hidden');
        grid.innerHTML = filtered.map(c => buildCardHTML(c, false)).join('');
    }
}

function renderFavorites() {
    const all = getCars();
    const favCars = all.filter(c => isFav(c.id));
    const grid  = document.getElementById('favGrid');
    const empty = document.getElementById('favEmpty');
    document.getElementById('favCount').textContent = favCars.length + ' elan';

    if (favCars.length === 0) {
        grid.innerHTML = '';
        empty.classList.remove('hidden');
    } else {
        empty.classList.add('hidden');
        grid.innerHTML = favCars.map(c => buildCardHTML(c, false)).join('');
    }
}

function renderMyAds() {
    const myAds = getUserAds();
    const grid  = document.getElementById('myAdsGrid');
    const empty = document.getElementById('myAdsEmpty');

    if (myAds.length === 0) {
        grid.innerHTML = '';
        empty.classList.remove('hidden');
    } else {
        empty.classList.add('hidden');
        grid.innerHTML = myAds.map(c => buildCardHTML(c, true)).join('');
    }
}

// ==================== FAVORITES ====================
function toggleFav(e, id) {
    e.stopPropagation();
    if (isFav(id)) {
        favorites = favorites.filter(f => f !== id);
    } else {
        favorites.push(id);
    }
    saveFavorites();
    // re-render current visible grid
    const favPage = document.getElementById('page-favorites');
    const myPage  = document.getElementById('page-myads');
    if (!favPage.classList.contains('hidden')) renderFavorites();
    else if (!myPage.classList.contains('hidden')) renderMyAds();
    else renderCards();
}

// ==================== CAR DETAIL MODAL ====================
function openModal(id) {
    const car = getCars().find(c => c.id === id);
    if (!car) return;
    const priceNum = Number(String(car.price).replace(/,/g,''));
    const fav = isFav(id);

    document.getElementById('modalCard').innerHTML = `
        <button class="modal-close" onclick="document.getElementById('modalOverlay').classList.add('hidden')">✕</button>
        <img class="modal-image" src="${car.img || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80'}" alt="${car.title}" onerror="this.src='https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80'">
        <div class="modal-body">
            <div class="modal-header">
                <div>
                    <div class="modal-title">${car.title}</div>
                    <div style="color:var(--text-muted);font-size:13px;margin-top:4px">${car.sub} &nbsp;•&nbsp; 📍 ${car.location}</div>
                </div>
                <div style="text-align:right">
                    <div class="modal-price">${formatPrice(priceNum)} $</div>
                    <button onclick="toggleFav(event,${id})" style="margin-top:6px;background:none;border:1px solid var(--border);border-radius:8px;padding:5px 12px;color:var(--text-muted);cursor:pointer;font-size:13px" id="modalFavBtn">
                        ${fav ? '❤️ Seçilmişdə' : '♡ Seçilmişlərə'}
                    </button>
                </div>
            </div>
            <div class="modal-specs">
                <div class="modal-spec"><div class="spec-label">İl</div><div class="spec-val">${car.year}</div></div>
                <div class="modal-spec"><div class="spec-label">Yürüş</div><div class="spec-val">${car.km} km</div></div>
                <div class="modal-spec"><div class="spec-label">Yanacaq</div><div class="spec-val">${car.fuel}</div></div>
                <div class="modal-spec"><div class="spec-label">Ötürücü</div><div class="spec-val">${car.trans}</div></div>
                <div class="modal-spec"><div class="spec-label">Mühərrik</div><div class="spec-val">${car.engine || '—'}</div></div>
                <div class="modal-spec"><div class="spec-label">Rəng</div><div class="spec-val">${car.color || '—'}</div></div>
            </div>
            <p class="modal-desc">${car.desc || 'Əlavə məlumat yoxdur.'}</p>
            <div class="modal-actions">
                <button class="btn-call" onclick="alert('📞 +994 50 XXX XX XX')">📞 Zəng et</button>
                <button class="btn-msg"  onclick="alert('💬 Mesaj göndərildi!')">💬 Mesaj yaz</button>
            </div>
        </div>`;
    document.getElementById('modalOverlay').classList.remove('hidden');
}

function closeModal(e) {
    if (e.target === document.getElementById('modalOverlay'))
        document.getElementById('modalOverlay').classList.add('hidden');
}

// ==================== ADD CAR MODAL ====================
function openAddModal() {
    document.getElementById('addModalOverlay').classList.remove('hidden');
    document.getElementById('addError').textContent = '';
    ['addMarka','addModel','addYear','addKm','addColor','addEngine','addPrice','addImg','addDesc'].forEach(id => document.getElementById(id).value = '');
    ['addFuel','addTrans','addCity','addBadge'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('userDropdown').classList.add('hidden');
}

function closeAddModal(e) {
    if (e.target === document.getElementById('addModalOverlay'))
        document.getElementById('addModalOverlay').classList.add('hidden');
}

function submitAd() {
    const marka  = document.getElementById('addMarka').value.trim();
    const model  = document.getElementById('addModel').value.trim();
    const year   = document.getElementById('addYear').value.trim();
    const km     = document.getElementById('addKm').value.trim();
    const fuel   = document.getElementById('addFuel').value;
    const trans  = document.getElementById('addTrans').value;
    const price  = document.getElementById('addPrice').value.trim();
    const city   = document.getElementById('addCity').value;
    const badge  = document.getElementById('addBadge').value;
    const color  = document.getElementById('addColor').value.trim();
    const engine = document.getElementById('addEngine').value.trim();
    const img    = document.getElementById('addImg').value.trim();
    const desc   = document.getElementById('addDesc').value.trim();
    const errorEl= document.getElementById('addError');

    if (!marka || !model || !year || !km || !fuel || !trans || !price || !city || !badge) {
        errorEl.textContent = '⚠️ * ilə işarələnmiş xanaları doldurun.'; return;
    }
    if (isNaN(year) || year < 1990 || year > 2025) { errorEl.textContent = '⚠️ Düzgün il daxil edin (1990–2025).'; return; }
    if (isNaN(price) || price <= 0)                 { errorEl.textContent = '⚠️ Düzgün qiymət daxil edin.'; return; }

    const stored = JSON.parse(localStorage.getItem('automarket_cars') || '[]');
    const allCars = getCars();
    const newId = Math.max(...allCars.map(c => c.id), 0) + 1;

    const badgeMap = { new:'✨ Yeni', used:'İşlənmiş', hot:'🔥 Populyar' };
    const kmFormatted = Number(km).toLocaleString('en-US');

    const newCar = {
        id: newId,
        title: marka + ' ' + model,
        sub: year + ' • ' + (engine || model),
        year: Number(year),
        km: kmFormatted,
        fuel, trans,
        color: color || '—',
        engine: engine || '—',
        power: '—',
        price: String(price),
        location: city,
        badge,
        badgeText: badgeMap[badge],
        img: img || '',
        desc: desc || '',
        owner: currentUser.username
    };

    stored.push(newCar);
    saveCars(stored);

    document.getElementById('addModalOverlay').classList.add('hidden');
    showPage('myads', null);

    // highlight nav
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelectorAll('.nav-link')[2].classList.add('active');
}

// ==================== DELETE AD ====================
function deleteAd(e, id) {
    e.stopPropagation();
    if (!confirm('Bu elanı silmək istədiyinizə əminsiniz?')) return;
    const stored = JSON.parse(localStorage.getItem('automarket_cars') || '[]');
    const updated = stored.filter(c => c.id !== id);
    saveCars(updated);
    // remove from favorites too
    favorites = favorites.filter(f => f !== id);
    saveFavorites();
    renderMyAds();
}

// ==================== PROFILE ====================
function openProfile() {
    document.getElementById('userDropdown').classList.add('hidden');
    const u = currentUser;
    document.getElementById('profileAvatar').textContent = (u.name || u.username).charAt(0).toUpperCase();
    document.getElementById('profileName').textContent   = u.name || u.username;
    document.getElementById('profileUsername').textContent = '@' + u.username;
    document.getElementById('profileEditName').value  = u.name  || '';
    document.getElementById('profileEditEmail').value = u.email || '';
    document.getElementById('profileEditPhone').value = u.phone || '';
    document.getElementById('profileEditCity').value  = u.city  || '';

    // stats
    const myAds = getUserAds();
    document.getElementById('statAds').textContent    = myAds.length;
    document.getElementById('statFavs').textContent   = favorites.length;
    document.getElementById('statViews').textContent  = '—';
    document.getElementById('statJoined').textContent = u.joined || '—';
    document.getElementById('statEmail').textContent  = u.email  || '—';
    document.getElementById('statPhone').textContent  = u.phone  || '—';

    // reset
    ['profileError','profileSuccess','passError','passSuccess'].forEach(id => document.getElementById(id).textContent = '');
    switchProfileTab('info', document.querySelector('.ptab'));

    document.getElementById('profileOverlay').classList.remove('hidden');
}

function closeProfileModal(e) {
    if (e.target === document.getElementById('profileOverlay'))
        document.getElementById('profileOverlay').classList.add('hidden');
}

function switchProfileTab(tab, btn) {
    ['info','password','stats'].forEach(t => {
        document.getElementById('ptab-' + t).classList.toggle('hidden', t !== tab);
    });
    document.querySelectorAll('.ptab').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
}

function saveProfile() {
    const name  = document.getElementById('profileEditName').value.trim();
    const email = document.getElementById('profileEditEmail').value.trim();
    const phone = document.getElementById('profileEditPhone').value.trim();
    const city  = document.getElementById('profileEditCity').value;
    const errorEl   = document.getElementById('profileError');
    const successEl = document.getElementById('profileSuccess');
    errorEl.textContent = ''; successEl.textContent = '';

    if (!name) { errorEl.textContent = '⚠️ Ad Soyad boş ola bilməz.'; return; }

    // update in localStorage
    if (currentUser.username !== 'admin') {
        const users = getUsers();
        const idx   = users.findIndex(u => u.username === currentUser.username);
        if (idx !== -1) {
            users[idx] = { ...users[idx], name, email, phone, city };
            saveUsers(users);
        }
    }

    // update session & state
    currentUser = { ...currentUser, name, email, phone, city };
    localStorage.setItem('automarket_session', JSON.stringify(currentUser));

    // update UI
    document.getElementById('dropdownName').textContent  = name;
    document.getElementById('userInitial').textContent   = name.charAt(0).toUpperCase();
    document.getElementById('profileName').textContent   = name;
    document.getElementById('profileAvatar').textContent = name.charAt(0).toUpperCase();
    document.getElementById('statEmail').textContent = email || '—';
    document.getElementById('statPhone').textContent = phone || '—';

    successEl.textContent = '✅ Məlumatlar yadda saxlandı!';
}

function changePassword() {
    const current  = document.getElementById('currentPass').value;
    const newP     = document.getElementById('newPass').value;
    const confirmP = document.getElementById('confirmNewPass').value;
    const errorEl  = document.getElementById('passError');
    const successEl= document.getElementById('passSuccess');
    errorEl.textContent = ''; successEl.textContent = '';

    if (!current || !newP || !confirmP) { errorEl.textContent = '⚠️ Bütün xanaları doldurun.'; return; }
    if (current !== currentUser.password) { errorEl.textContent = '❌ Cari şifrə yanlışdır.'; return; }
    if (newP.length < 6)  { errorEl.textContent = '⚠️ Yeni şifrə ən azı 6 simvol olmalıdır.'; return; }
    if (newP !== confirmP) { errorEl.textContent = '❌ Yeni şifrələr uyğun gəlmir.'; return; }

    if (currentUser.username !== 'admin') {
        const users = getUsers();
        const idx   = users.findIndex(u => u.username === currentUser.username);
        if (idx !== -1) { users[idx].password = newP; saveUsers(users); }
    }
    currentUser.password = newP;
    localStorage.setItem('automarket_session', JSON.stringify(currentUser));

    ['currentPass','newPass','confirmNewPass'].forEach(id => document.getElementById(id).value = '');
    successEl.textContent = '✅ Şifrə uğurla dəyişdirildi!';
}

// ==================== USER DROPDOWN ====================
function toggleUserDropdown() {
    document.getElementById('userDropdown').classList.toggle('hidden');
}

document.addEventListener('click', e => {
    const menu = document.getElementById('userMenu');
    if (menu && !menu.contains(e.target))
        document.getElementById('userDropdown').classList.add('hidden');
});

// ==================== INIT ====================
window.addEventListener('DOMContentLoaded', () => {
    const session = localStorage.getItem('automarket_session');
    if (session) {
        currentUser = JSON.parse(session);
        loadFavorites();
        showSite();
    }
});

// Enter key
document.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const lf = document.getElementById('loginForm');
    const rf = document.getElementById('registerForm');
    if (lf && !lf.classList.contains('hidden')) login();
    else if (rf && !rf.classList.contains('hidden')) register();
});
