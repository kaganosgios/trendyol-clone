'use client';

import Image from 'next/image';
import { useMemo, useState, type ReactNode } from 'react';

const topCategories = [
  'Kadın',
  'Erkek',
  'Anne & Çocuk',
  'Ev & Yaşam',
  'Süpermarket',
  'Kozmetik',
  'Ayakkabı & Çanta',
  'Elektronik',
  'Saat & Aksesuar',
  'Spor & Outdoor'
];

const sidebarCategories = [
  'Mobilya',
  'Mutfak & Banyo Mobilyası',
  'Antre & Hol',
  'Çalışma Odası',
  'Salon & Oturma Odası',
  'Masa',
  'Yatak Odası',
  'Bahçe Balkon Mobilyası',
  'Bebek Çocuk Odası'
];

const brands = ['IKEA', 'Vivense', 'Evdemo', 'MOBILIQUE', 'Yataş', 'Mrg Office', 'Mygusi', 'Bino'];

const sortOptions = [
  'Önerilen Sıralama',
  'En Düşük Fiyat',
  'En Yüksek Fiyat',
  'En Yeniler',
  'En Çok Satan',
  'En Favoriler',
  'En Çok Değerlendirilen'
];

const mobileFilterCategories = [
  'Avantajlı Ürünler',
  'Beden',
  'Marka',
  'Cinsiyet',
  'Renk',
  'Ürün Puanı',
  'Fiyat',
  'Kalıp'
];

const products = [
  {
    title: 'thebesthm Duvara Monte Mop ve Paspas Tutucu Gold',
    price: '24,99 TL',
    img: 'https://picsum.photos/seed/prod1/400/500',
    badge: 'En Çok Satan 2. Ürün'
  },
  {
    title: 'bituclass Mini Dekoratif Banyo Rafı Havluluk Peçetelik 8 Katlı',
    price: '469 TL',
    img: 'https://picsum.photos/seed/prod2/400/500',
    badge: 'En Çok Satan 1. Ürün'
  },
  {
    title: 'VILINZE Ege Sandalye Avanos Ahşap MDF Mutfak Masası Takımı',
    price: '19.990 TL',
    img: 'https://picsum.photos/seed/prod3/400/500',
    badge: 'Başarılı Satıcı'
  },
  {
    title: 'Home Takı Kanca Ray Organizer Askılık 10 Bölmeli',
    price: '14,85 TL',
    img: 'https://picsum.photos/seed/prod4/400/500',
    badge: 'En Çok Satan 1. Ürün'
  },
  {
    title: 'Minimal Ahşap Çalışma Masası Metal Ayaklı',
    price: '2.799 TL',
    img: 'https://picsum.photos/seed/prod5/400/500',
    badge: 'Kargo Bedava'
  },
  {
    title: 'Modern TV Ünitesi Duvar Raflı Çok Amaçlı',
    price: '3.499 TL',
    img: 'https://picsum.photos/seed/prod6/400/500',
    badge: 'Hızlı Teslimat'
  },
  {
    title: 'Bohem Tarz Yatak Odası Komodin 2 Çekmeceli',
    price: '1.149 TL',
    img: 'https://picsum.photos/seed/prod7/400/500',
    badge: 'Yüksek Puanlı'
  },
  {
    title: 'Salon İçin 3lü Sehpa Seti Mermer Desenli',
    price: '1.899 TL',
    img: 'https://picsum.photos/seed/prod8/400/500',
    badge: 'Öne Çıkan Ürün'
  }
];

const mobileGridProducts = [...products, ...products, ...products].slice(0, 12);

type FilterKey =
  | 'category'
  | 'brand'
  | 'advantage'
  | 'rating'
  | 'height'
  | 'size'
  | 'width'
  | 'depth';
type MobilePanel = 'sort' | 'filter' | null;
type MobileChipFilter = 'marka' | 'renk' | 'fiyat' | 'kalip' | 'materyal' | null;

const mobileChipOptions: Record<string, string[]> = {
  marka: ['U.S. Polo Assn.', 'Tommy Hilfiger', 'Lacoste', 'Polo Ralph Lauren', 'Mavi', 'Koton', 'LC Waikiki'],
  renk: ['Siyah', 'Beyaz', 'Lacivert', 'Gri', 'Yeşil', 'Mavi', 'Kırmızı', 'Bej'],
  fiyat: ['0 - 250 TL', '250 - 500 TL', '500 - 1000 TL', '1000 - 2000 TL', '2000 TL ve üzeri'],
  kalip: ['Slim Fit', 'Regular Fit', 'Oversize', 'Dar Kalıp', 'Rahat Kalıp'],
  materyal: ['Pamuk', 'Polyester', 'Keten', 'Viskon', 'Pamuk Karışımlı']
};

const filterOptions: Record<FilterKey, string[]> = {
  category: sidebarCategories,
  brand: brands,
  advantage: ['Süper Avantajlı Ürün', 'Çok Avantajlı Ürün', 'Avantajlı Ürün'],
  rating: ['4.5 ve üzeri', '4 ve üzeri', '3.5 ve üzeri'],
  height: ['0-50 cm', '50-100 cm', '100+ cm'],
  size: ['Küçük', 'Orta', 'Büyük'],
  width: ['0-60 cm', '60-120 cm', '120+ cm'],
  depth: ['0-40 cm', '40-80 cm', '80+ cm']
};

const filterTitles: Record<FilterKey, string> = {
  category: 'Kategori',
  brand: 'Marka',
  advantage: 'Avantajlı Ürünler',
  rating: 'Ürün Puanı',
  height: 'Yükseklik',
  size: 'Ölçü',
  width: 'Genişlik',
  depth: 'Derinlik'
};

function CheckItem({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-[14px] leading-6 text-[#333]">
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span
        className={`flex h-4 w-4 items-center justify-center rounded border ${
          checked ? 'border-[#f27a1a] bg-[#f27a1a] text-white' : 'border-[#d9d9d9] bg-white'
        }`}
      >
        {checked ? '✓' : ''}
      </span>
      {label}
    </label>
  );
}

function FilterBlock({
  title,
  isOpen,
  onToggle,
  children
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className="mb-3 rounded-lg border border-[#e6e6e6] p-4">
      <button className="flex w-full items-center justify-between text-[14px] font-semibold" onClick={onToggle} type="button">
        {title}
        <span className={`text-[#999] transition-transform ${isOpen ? 'rotate-180' : ''}`}>⌄</span>
      </button>
      {isOpen ? <div className="mt-3 space-y-1">{children}</div> : null}
    </div>
  );
}

function ProductCard({ title, price, img, badge }: (typeof products)[number]) {
  return (
    <article className="overflow-hidden rounded-lg border border-[#e6e6e6] bg-white">
      <div className="relative h-[296px] w-full bg-[#f6f6f6]">
        <Image src={img} alt={title} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" unoptimized />
        <button className="absolute right-3 top-3 h-9 w-9 rounded-full border border-[#e8e8e8] bg-white text-lg text-[#777]">♡</button>
      </div>
      <div className="h-6 bg-[#f27a1a] px-2 text-center text-[12px] font-semibold leading-6 text-white">{badge}</div>
      <div className="space-y-1 p-3">
        <h3 className="min-h-10 overflow-hidden text-[13px] leading-5 text-[#333]">{title}</h3>
        <p className="text-[12px] text-[#666]">⭐ 4.2 · 1.8B değerlendirme</p>
        <p className="text-[14px] font-semibold leading-5 text-[#f27a1a]">{price}</p>
      </div>
    </article>
  );
}

function MobileGridCard({ title, price, img, badge }: (typeof products)[number]) {
  return (
    <article className="overflow-hidden rounded-lg border border-[#e4e4e4] bg-white">
      <div className="relative h-[180px] w-full bg-[#f6f6f6]">
        <Image src={img} alt={title} fill className="object-cover" sizes="50vw" unoptimized />
        <span className="absolute left-2 top-2 rounded bg-[#f27a1a] px-1.5 py-0.5 text-[9px] font-semibold text-white">{badge}</span>
        <button className="absolute right-2 top-2 h-7 w-7 rounded-full border border-[#e5e5e5] bg-white text-sm leading-none text-[#666]">♡</button>
      </div>
      <div className="space-y-0.5 p-2">
        <p className="line-clamp-2 min-h-8 text-[11px] font-medium leading-4 text-[#333]">{title}</p>
        <p className="text-[10px] text-[#777]">⭐ 4.2 · 1.8B değerlendirme</p>
        <p className="text-[13px] font-semibold leading-5 text-[#f27a1a]">{price}</p>
      </div>
    </article>
  );
}

export default function Home() {
  const [openBlocks, setOpenBlocks] = useState<Record<FilterKey, boolean>>({
    category: true,
    brand: true,
    advantage: true,
    rating: false,
    height: false,
    size: false,
    width: false,
    depth: false
  });

  const [selected, setSelected] = useState<Record<FilterKey, string[]>>({
    category: ['Mobilya'],
    brand: [],
    advantage: [],
    rating: [],
    height: [],
    size: [],
    width: [],
    depth: []
  });

  const [brandQuery, setBrandQuery] = useState('');
  const [mobilePanel, setMobilePanel] = useState<MobilePanel>(null);
  const [mobileChipFilter, setMobileChipFilter] = useState<MobileChipFilter>(null);
  const [selectedChipFilters, setSelectedChipFilters] = useState<Record<string, string[]>>({
    marka: [],
    renk: [],
    fiyat: [],
    kalip: [],
    materyal: []
  });
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Önerilen Sıralama');

  const filteredBrands = useMemo(
    () => brands.filter((item) => item.toLocaleLowerCase('tr').includes(brandQuery.toLocaleLowerCase('tr'))),
    [brandQuery]
  );

  const toggleBlock = (key: FilterKey) => {
    setOpenBlocks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleChipOption = (chip: string, option: string) => {
    setSelectedChipFilters((prev) => {
      const exists = prev[chip]?.includes(option);
      return {
        ...prev,
        [chip]: exists ? prev[chip].filter((item) => item !== option) : [...(prev[chip] || []), option]
      };
    });
  };

  const toggleOption = (key: FilterKey, option: string) => {
    setSelected((prev) => {
      const exists = prev[key].includes(option);
      return {
        ...prev,
        [key]: exists ? prev[key].filter((item) => item !== option) : [...prev[key], option]
      };
    });
  };

  return (
    <main className="min-h-screen bg-white text-[#333]">
      {/* Desktop Header */}
      <header className="hidden border-b border-[#ececec] md:block">
        <div className="mx-auto flex h-[74px] max-w-[1500px] items-center gap-6 px-4 lg:px-8">
          <div className="text-[32px] font-medium leading-none tracking-[0.3px] text-[#3c3c3c]">trendyol</div>
          <div className="flex-1">
            <div className="flex h-11 items-center rounded-lg bg-[#f3f3f3] px-4">
              <svg className="h-5 w-5 text-[#f27a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="Ürün, kategori veya marka ara" 
                className="ml-3 flex-1 bg-transparent text-[14px] text-[#333] outline-none placeholder:text-[#666]"
              />
            </div>
          </div>
          <nav className="ml-auto flex items-center gap-6 text-[14px]">
            <a href="#" className="flex items-center gap-1.5 text-[#333] hover:text-[#f27a1a]">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Giriş Yap</span>
            </a>
            <a href="#" className="flex items-center gap-1.5 text-[#333] hover:text-[#f27a1a]">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>Favorilerim</span>
            </a>
            <a href="#" className="flex items-center gap-1.5 text-[#333] hover:text-[#f27a1a]">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Sepetim</span>
            </a>
          </nav>
        </div>
        <div className="mx-auto hidden max-w-[1500px] items-center gap-6 px-4 pb-3 text-[14px] lg:flex lg:px-8">
          <span className="flex items-center gap-1 font-medium text-[#333]">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Kategoriler
            <span className="ml-1 rounded bg-[#f27a1a] px-1.5 py-0.5 text-[10px] font-semibold text-white">Yeni</span>
          </span>
          {topCategories.map((item, idx) => (
            <span key={item} className={idx === 0 ? 'font-semibold text-[#f27a1a]' : 'cursor-pointer text-[#333] hover:text-[#f27a1a]'}>
              {item}
            </span>
          ))}
          <span className="flex items-center gap-1 cursor-pointer text-[#333] hover:text-[#f27a1a]">
            Flaş Ürünler
            <span className="rounded bg-[#f27a1a] px-1.5 py-0.5 text-[10px] font-semibold text-white">Yeni</span>
          </span>
          <span className="cursor-pointer text-[#333] hover:text-[#f27a1a]">Çok Satanlar</span>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="sticky top-0 z-40 border-b border-[#ececec] bg-white md:hidden">
        <div className="flex h-12 items-center px-3">
          <button className="flex h-8 w-8 items-center justify-center">
            <svg className="h-5 w-5 text-[#333]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="ml-1 text-[18px] font-medium tracking-[0.2px] text-[#3c3c3c]">trendyol</div>
          <div className="ml-auto flex items-center gap-4">
            <button className="text-[#333]">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="text-[#333]">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <button className="text-[#333]">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="text-[#333]">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-1 px-3 pb-2 text-[12px] text-[#666]">
          <span>Trendyol</span>
          <span className="text-[#ccc]">›</span>
          <span>Giyim</span>
          <span className="text-[#ccc]">›</span>
          <span className="text-[#333]">Polo Yaka T-shirt</span>
        </div>
      </header>

      <section className="mx-auto max-w-[1500px] px-3 pb-24 pt-4 lg:px-8 lg:pb-8">
        {/* Desktop Layout - Sidebar + Content */}
        <div className="hidden gap-5 lg:flex">
          {/* Left Sidebar - Categories */}
          <aside className="w-[220px] shrink-0">
            <div className="mb-4 border-b border-[#ececec] pb-4">
              <h3 className="mb-3 text-[16px] font-semibold text-[#333]">Kategori</h3>
              <input
                className="h-9 w-full rounded border border-[#ececec] px-3 text-[13px] outline-none placeholder:text-[#999]"
                placeholder="Kategori Ara"
              />
            </div>
            
            <FilterBlock title={filterTitles.category} isOpen={openBlocks.category} onToggle={() => toggleBlock('category')}>
              {filterOptions.category.map((item) => (
                <CheckItem
                  key={item}
                  label={item}
                  checked={selected.category.includes(item)}
                  onChange={() => toggleOption('category', item)}
                />
              ))}
            </FilterBlock>

            <FilterBlock title={filterTitles.brand} isOpen={openBlocks.brand} onToggle={() => toggleBlock('brand')}>
              <input
                className="mb-2 h-9 w-full rounded border border-[#ececec] px-3 text-[13px] outline-none"
                placeholder="Marka Ara"
                value={brandQuery}
                onChange={(e) => setBrandQuery(e.target.value)}
              />
              {filteredBrands.map((item) => (
                <CheckItem key={item} label={item} checked={selected.brand.includes(item)} onChange={() => toggleOption('brand', item)} />
              ))}
            </FilterBlock>

            <FilterBlock title={filterTitles.advantage} isOpen={openBlocks.advantage} onToggle={() => toggleBlock('advantage')}>
              {filterOptions.advantage.map((item) => (
                <CheckItem
                  key={item}
                  label={item}
                  checked={selected.advantage.includes(item)}
                  onChange={() => toggleOption('advantage', item)}
                />
              ))}
            </FilterBlock>

            <FilterBlock title={filterTitles.rating} isOpen={openBlocks.rating} onToggle={() => toggleBlock('rating')}>
              {filterOptions.rating.map((item) => (
                <CheckItem key={item} label={item} checked={selected.rating.includes(item)} onChange={() => toggleOption('rating', item)} />
              ))}
            </FilterBlock>

            <FilterBlock title={filterTitles.height} isOpen={openBlocks.height} onToggle={() => toggleBlock('height')}>
              {filterOptions.height.map((item) => (
                <CheckItem key={item} label={item} checked={selected.height.includes(item)} onChange={() => toggleOption('height', item)} />
              ))}
            </FilterBlock>

            <FilterBlock title={filterTitles.size} isOpen={openBlocks.size} onToggle={() => toggleBlock('size')}>
              {filterOptions.size.map((item) => (
                <CheckItem key={item} label={item} checked={selected.size.includes(item)} onChange={() => toggleOption('size', item)} />
              ))}
            </FilterBlock>

            <FilterBlock title={filterTitles.width} isOpen={openBlocks.width} onToggle={() => toggleBlock('width')}>
              {filterOptions.width.map((item) => (
                <CheckItem key={item} label={item} checked={selected.width.includes(item)} onChange={() => toggleOption('width', item)} />
              ))}
            </FilterBlock>

            <FilterBlock title={filterTitles.depth} isOpen={openBlocks.depth} onToggle={() => toggleBlock('depth')}>
              {filterOptions.depth.map((item) => (
                <CheckItem key={item} label={item} checked={selected.depth.includes(item)} onChange={() => toggleOption('depth', item)} />
              ))}
            </FilterBlock>
          </aside>

          {/* Right Content - Title, Chips, Products */}
          <div className="min-w-0 flex-1">
            {/* Title Row with Sort */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-baseline gap-3">
                <h1 className="text-[24px] font-bold text-[#333]">Mobilya</h1>
                <span className="text-[14px] text-[#8b8b8b]">100000+ Ürün</span>
              </div>
              <div className="relative">
                <button 
                  onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                  className="flex items-center gap-3 text-[14px] text-[#333]"
                >
                  <span>{selectedSort}</span>
                  {/* Up-Down Arrow Icon */}
                  <svg className="h-5 w-5 text-[#f27a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </button>
                
                {sortDropdownOpen && (
                  <div className="absolute right-0 top-10 z-30 w-64 rounded-lg border border-[#e5e5e5] bg-white py-2 shadow-lg">
                    {/* First item - Önerilen Sıralama with info icon */}
                    <button
                      onClick={() => { setSelectedSort('Önerilen Sıralama'); setSortDropdownOpen(false); }}
                      className="flex w-full items-center gap-2 px-4 py-3 text-left text-[15px] font-medium text-[#f27a1a] hover:bg-[#f8f8f8]"
                    >
                      <span>Önerilen Sıralama</span>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" strokeWidth={2} />
                        <path strokeLinecap="round" strokeWidth={2} d="M12 16v-4m0-4h.01" />
                      </svg>
                    </button>
                    {/* Other options */}
                    {sortOptions.slice(1).map((option) => (
                      <button
                        key={option}
                        onClick={() => { setSelectedSort(option); setSortDropdownOpen(false); }}
                        className={`block w-full px-4 py-3 text-left text-[15px] hover:bg-[#f8f8f8] ${
                          selectedSort === option ? 'text-[#f27a1a]' : 'text-[#333]'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Filter Chips */}
            <div className="mb-4 flex flex-wrap gap-2">
              {['⚡ Flaş Ürünler', '⭐ Yüksek Puanlı Ürünler', '🏪 Yüksek Puanlı Satıcılar', '📦 Kargo Bedava', '🚚 Hızlı Teslimat'].map((chip) => (
                <span key={chip} className="cursor-pointer rounded-full border border-[#e5e5e5] bg-white px-4 py-2 text-[13px] text-[#555] hover:border-[#f27a1a] hover:text-[#f27a1a]">
                  {chip}
                </span>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-4 gap-4">
              {products.map((item) => (
                <ProductCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          {/* Mobile Title Row - separate line with back arrow, centered */}
          <div className="relative mb-2 flex items-center justify-center border-b border-[#ececec] pb-3">
            <button className="absolute left-0 text-[24px] text-[#333]">‹</button>
            <div className="text-center">
              <h1 className="text-[15px] font-semibold text-[#333]">Polo Yaka T-Shirt</h1>
              <p className="text-[11px] text-[#8b8b8b]">31049+ Ürün</p>
            </div>
          </div>

          {/* Mobile Sort & Filter Bar - Tabs style like in image */}
          <div className="flex border-b border-[#ececec]">
            <button 
              onClick={() => setMobilePanel('sort')}
              className="flex flex-1 items-center justify-center gap-2 py-3 text-[13px] text-[#333]"
            >
              <svg className="h-4 w-4 text-[#f27a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              <span>Önerilen Sıralama</span>
            </button>
            <div className="my-2 w-px bg-[#ececec]" />
            <button 
              onClick={() => setMobilePanel('filter')}
              className="flex flex-1 items-center justify-center gap-2 py-3 text-[13px] text-[#333]"
            >
              <svg className="h-4 w-4 text-[#f27a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>Filtrele</span>
              {Object.values(selected).flat().length > 0 && (
                <span className="ml-0.5 text-[#f27a1a]">({Object.values(selected).flat().length})</span>
              )}
            </button>
          </div>

          {/* Mobile Quick Filter Chips - horizontal scroll with orange arrows */}
          <div className="flex gap-2 overflow-x-auto py-3">
            {[
              { label: 'Marka', key: 'marka' },
              { label: 'Renk', key: 'renk' },
              { label: 'Fiyat', key: 'fiyat' },
              { label: 'Kalıp', key: 'kalip' },
              { label: 'Materyal', key: 'materyal' }
            ].map((chip) => (
              <button
                key={chip.key}
                onClick={() => setMobileChipFilter(mobileChipFilter === chip.key ? null : chip.key as MobileChipFilter)}
                className={`flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border px-3 py-1.5 text-[12px] ${
                  mobileChipFilter === chip.key || (selectedChipFilters[chip.key]?.length > 0)
                    ? 'border-[#f27a1a] bg-[#fff8f2] text-[#f27a1a]'
                    : 'border-[#e4e4e4] bg-white text-[#333]'
                }`}
              >
                {chip.label}
                {selectedChipFilters[chip.key]?.length > 0 && (
                  <span className="text-[#f27a1a]">({selectedChipFilters[chip.key].length})</span>
                )}
                <svg className={`h-3 w-3 transition-transform ${mobileChipFilter === chip.key ? 'rotate-180' : ''} text-[#f27a1a]`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {mobileGridProducts.map((item, index) => (
              <MobileGridCard key={`${item.title}-${index}`} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Sort Bottom Sheet */}
      {mobilePanel === 'sort' && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobilePanel(null)} />
          <div className="absolute bottom-0 left-0 right-0 rounded-t-2xl bg-white">
            <div className="flex items-center justify-between border-b border-[#ececec] p-4">
              <span className="text-[16px] font-semibold">Sıralama</span>
              <button onClick={() => setMobilePanel(null)} className="text-[24px] text-[#666]">×</button>
            </div>
            <div className="p-4">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => { setSelectedSort(option); setMobilePanel(null); }}
                  className="flex w-full items-center justify-between py-3 text-left text-[14px] text-[#333]"
                >
                  <span className={option === 'Önerilen Sıralama' ? 'flex items-center gap-1' : ''}>
                    {option}
                    {option === 'Önerilen Sıralama' && (
                      <svg className="h-4 w-4 text-[#999]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    )}
                  </span>
                  {selectedSort === option && (
                    <svg className="h-5 w-5 text-[#f27a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Filter Full Screen */}
      {mobilePanel === 'filter' && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden">
          <div className="flex h-14 items-center justify-between border-b border-[#ececec] px-4">
            <button onClick={() => setMobilePanel(null)} className="text-[24px] text-[#333]">×</button>
            <span className="text-[16px] font-semibold">Filtrele</span>
            <div className="w-6" />
          </div>
          
          {Object.values(selected).flat().length > 0 && (
            <div className="border-b border-[#ececec] p-4">
              <p className="mb-2 text-[12px] text-[#666]">Seçilen Filtreler</p>
              <div className="flex flex-wrap gap-2">
                {Object.values(selected).flat().map((filter) => (
                  <span key={filter} className="flex items-center gap-1 rounded-full border border-[#e5e5e5] bg-[#f8f8f8] px-3 py-1 text-[12px]">
                    {filter}
                    <button className="text-[#999]">×</button>
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex-1 overflow-auto">
            {['Avantajlı Ürünler', 'Beden', 'Marka', 'Cinsiyet', 'Renk', 'Ürün Puanı', 'Fiyat', 'Kalıp'].map((category) => (
              <button
                key={category}
                className="flex w-full items-center justify-between border-b border-[#f0f0f0] px-4 py-4 text-left"
              >
                <span className="text-[14px] text-[#333]">{category}</span>
                <svg className="h-5 w-5 text-[#999]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
          
          <div className="border-t border-[#ececec] p-4">
            <button 
              onClick={() => setMobilePanel(null)}
              className="w-full rounded-lg bg-[#f27a1a] py-3 text-[14px] font-semibold text-white"
            >
              Tüm Sonuçları Listele (31049)
            </button>
          </div>
        </div>
      )}

      {/* Mobile Chip Filter Bottom Sheet */}
      {mobileChipFilter && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileChipFilter(null)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[70vh] rounded-t-2xl bg-white">
            <div className="flex items-center justify-between border-b border-[#ececec] p-4">
              <span className="text-[16px] font-semibold capitalize">
                {mobileChipFilter === 'kalip' ? 'Kalıp' : mobileChipFilter.charAt(0).toUpperCase() + mobileChipFilter.slice(1)}
              </span>
              <button onClick={() => setMobileChipFilter(null)} className="text-[24px] text-[#666]">×</button>
            </div>
            <div className="max-h-[50vh] overflow-auto p-4">
              {mobileChipOptions[mobileChipFilter]?.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-3 py-3 text-[14px] text-[#333]"
                >
                  <input
                    type="checkbox"
                    checked={selectedChipFilters[mobileChipFilter]?.includes(option) || false}
                    onChange={() => toggleChipOption(mobileChipFilter, option)}
                    className="sr-only"
                  />
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded border ${
                      selectedChipFilters[mobileChipFilter]?.includes(option)
                        ? 'border-[#f27a1a] bg-[#f27a1a] text-white'
                        : 'border-[#d9d9d9] bg-white'
                    }`}
                  >
                    {selectedChipFilters[mobileChipFilter]?.includes(option) && '✓'}
                  </span>
                  {option}
                </label>
              ))}
            </div>
            <div className="border-t border-[#ececec] p-4">
              <button 
                onClick={() => setMobileChipFilter(null)}
                className="w-full rounded-lg bg-[#f27a1a] py-3 text-[14px] font-semibold text-white"
              >
                Uygula ({selectedChipFilters[mobileChipFilter]?.length || 0} seçili)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Close dropdown when clicking outside */}
      {sortDropdownOpen && (
        <div className="fixed inset-0 z-20" onClick={() => setSortDropdownOpen(false)} />
      )}

      <div className="h-4 lg:hidden" />
    </main>
  );
}
