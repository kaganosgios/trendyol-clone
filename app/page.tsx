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

const products = [
  {
    title: 'thebesthm Duvara Monte Mop ve Paspas Tutucu Gold',
    price: '24,99 TL',
    img: 'https://images.unsplash.com/photo-1617098474202-0d0d7f60f8f8?auto=format&fit=crop&w=900&q=80',
    badge: 'En Çok Satan 2. Ürün'
  },
  {
    title: 'bituclass Mini Dekoratif Banyo Rafı Havluluk Peçetelik 8 Katlı',
    price: '469 TL',
    img: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=900&q=80',
    badge: 'En Çok Satan 1. Ürün'
  },
  {
    title: 'VILINZE Ege Sandalye Avanos Ahşap MDF Mutfak Masası Takımı',
    price: '19.990 TL',
    img: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=900&q=80',
    badge: 'Başarılı Satıcı'
  },
  {
    title: 'Home Takı Kanca Ray Organizer Askılık 10 Bölmeli',
    price: '14,85 TL',
    img: 'https://images.unsplash.com/photo-1616628188502-36457a0f8f09?auto=format&fit=crop&w=900&q=80',
    badge: 'En Çok Satan 1. Ürün'
  },
  {
    title: 'Minimal Ahşap Çalışma Masası Metal Ayaklı',
    price: '2.799 TL',
    img: 'https://images.unsplash.com/photo-1486946255434-2466348c2166?auto=format&fit=crop&w=900&q=80',
    badge: 'Kargo Bedava'
  },
  {
    title: 'Modern TV Ünitesi Duvar Raflı Çok Amaçlı',
    price: '3.499 TL',
    img: 'https://images.unsplash.com/photo-1582582429416-7c5f7f40d4f4?auto=format&fit=crop&w=900&q=80',
    badge: 'Hızlı Teslimat'
  },
  {
    title: 'Bohem Tarz Yatak Odası Komodin 2 Çekmeceli',
    price: '1.149 TL',
    img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    badge: 'Yüksek Puanlı'
  },
  {
    title: 'Salon İçin 3lü Sehpa Seti Mermer Desenli',
    price: '1.899 TL',
    img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
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
type MobilePanel = 'sort' | 'filter' | 'category' | 'brand' | 'price' | null;

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
const mobilePriceOptions = ['0 - 500 TL', '500 - 2.000 TL', '2.000 - 10.000 TL', '10.000 TL+'];

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
        <Image src={img} alt={title} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
        <button className="absolute right-3 top-3 h-9 w-9 rounded-full border border-[#e8e8e8] bg-white text-lg text-[#777]">♡</button>
      </div>
      <div className="h-6 bg-[#f27a1a] px-2 text-center text-[12px] font-semibold leading-6 text-white">{badge}</div>
      <div className="space-y-1 p-3">
        <h3 className="min-h-10 overflow-hidden text-[13px] leading-5 text-[#333]">{title}</h3>
        <p className="text-[12px] text-[#666]">⭐ 4.2 · 1.8B değerlendirme</p>
        <p className="text-[24px] font-semibold leading-7 text-[#f27a1a]">{price}</p>
      </div>
    </article>
  );
}

function MobileGridCard({ title, price, img, badge }: (typeof products)[number]) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#e4e4e4] bg-white">
      <div className="relative h-[250px] w-full bg-[#f6f6f6]">
        <Image src={img} alt={title} fill className="object-cover" sizes="50vw" />
        <span className="absolute left-2 top-2 rounded-full bg-[#f27a1a] px-2 py-0.5 text-[10px] font-semibold text-white">{badge}</span>
        <button className="absolute right-2 top-2 h-8 w-8 rounded-full border border-[#e5e5e5] bg-white text-lg leading-none text-[#666]">♡</button>
      </div>
      <div className="space-y-1 p-2.5">
        <p className="min-h-12 text-[11px] font-medium leading-4 text-[#333]">{title}</p>
        <p className="text-[11px] text-[#777]">⭐ 4.3 (340)</p>
        <p className="text-[12px] text-[#f07a1a]">🎟 Kupon Fırsatı</p>
        <p className="text-[24px] font-semibold leading-tight text-[#f27a1a]">{price}</p>
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
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);

  const filteredBrands = useMemo(
    () => brands.filter((item) => item.toLocaleLowerCase('tr').includes(brandQuery.toLocaleLowerCase('tr'))),
    [brandQuery]
  );

  const toggleBlock = (key: FilterKey) => {
    setOpenBlocks((prev) => ({ ...prev, [key]: !prev[key] }));
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

  const togglePriceOption = (option: string) => {
    setSelectedPrices((prev) => (prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]));
  };

  const toggleMobilePanel = (panel: Exclude<MobilePanel, null>) => {
    setMobilePanel((prev) => (prev === panel ? null : panel));
  };

  return (
    <main className="min-h-screen bg-white text-[#333]">
      <header className="border-b border-[#ececec]">
        <div className="mx-auto flex h-[74px] max-w-[1500px] items-center gap-6 px-4 lg:px-8">
          <div className="text-[52px] font-light leading-none tracking-tight">trendyol</div>
          <div className="hidden flex-1 md:block">
            <div className="flex h-11 items-center rounded-md bg-[#f3f3f3] px-4 text-[#999]">
              🔍
              <span className="ml-3 text-[14px]">Ürün, kategori veya marka ara</span>
            </div>
          </div>
          <nav className="ml-auto hidden items-center gap-6 text-[16px] md:flex">
            <a href="#">Giriş Yap</a>
            <a href="#">Favorilerim</a>
            <a href="#">Sepetim</a>
          </nav>
        </div>
        <div className="mx-auto hidden max-w-[1500px] items-center gap-7 px-4 pb-2 text-[15px] lg:flex lg:px-8">
          <span className="font-medium">☰ Kategoriler</span>
          {topCategories.map((item, idx) => (
            <span key={item} className={idx === 0 ? 'border-b-2 border-[#f27a1a] pb-1 font-semibold text-[#f27a1a]' : ''}>
              {item}
            </span>
          ))}
          <span>Çok Satanlar</span>
        </div>
      </header>

      <section className="mx-auto max-w-[1500px] px-3 pb-24 pt-4 lg:px-8 lg:pb-8">
        <div className="mb-3 hidden items-center gap-2 text-[18px] lg:flex">
          <span className="text-[#999]">Trendyol</span>
          <span className="text-[#999]">›</span>
          <span className="text-[#999]">Ev ve Mobilya</span>
          <span className="text-[#999]">›</span>
          <span className="font-semibold text-[#333]">Mobilya</span>
        </div>

        <div className="mb-4 flex items-center justify-between gap-2">
          <div>
            <h1 className="text-[22px] font-semibold lg:text-[36px]">Mobilya</h1>
            <p className="text-[14px] text-[#8b8b8b]">100000+ Ürün</p>
          </div>
          <button className="h-10 rounded-full border border-[#e5e5e5] px-4 text-[13px] text-[#666]">Önerilen Sıralama ↕</button>
        </div>

        <div className="mb-4 flex flex-wrap gap-2 lg:gap-3">
          {['⚡ Flaş Ürünler', '⭐ Yüksek Puanlı Ürünler', '🚚 Hızlı Teslimat', '📦 Kargo Bedava'].map((chip) => (
            <span key={chip} className="rounded-full bg-[#f6f6f6] px-4 py-2 text-[13px] text-[#555]">
              {chip}
            </span>
          ))}
        </div>

        <div className="hidden gap-5 lg:flex">
          <aside className="w-[290px] shrink-0">
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

          <div className="min-w-0 flex-1">
            <div className="mb-4 rounded-lg border border-[#ececec] p-4">
              <div className="mb-2 text-right text-[11px] text-[#999]">Sponsorlu</div>
              <div className="grid grid-cols-4 gap-3">
                {products.slice(0, 4).map((item) => (
                  <div key={item.title} className="rounded-lg border border-[#ececec] p-2">
                    <div className="mb-2 h-12 overflow-hidden text-[13px] font-semibold leading-4">{item.title}</div>
                    <div className="relative mb-2 h-16 overflow-hidden rounded bg-[#f6f6f6]">
                      <Image src={item.img} alt={item.title} fill className="object-cover" sizes="180px" />
                    </div>
                    <p className="text-[26px] font-semibold text-[#f27a1a]">{item.price}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {products.map((item) => (
                <ProductCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <div className="sticky top-0 z-20 -mx-3 mb-2 border-b border-[#ececec] bg-white px-3 pb-2 pt-2">
            <div className="mb-2 flex items-center gap-2">
              <button className="text-[34px] leading-none text-[#333]">←</button>
              <div className="flex h-12 flex-1 items-center rounded-full bg-[#efefef] px-4 text-[16px] text-[#666]">
                🔍
                <span className="ml-2">Mobilya (100.000+ ürün)</span>
                <span className="ml-auto text-[20px]">⊗</span>
              </div>
              <button className="text-[24px] text-[#555]">⚙</button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {[
                { label: '⇵ Sırala', key: 'sort' as const },
                { label: '⚲ Filtrele', key: 'filter' as const },
                { label: 'Kategori ⌄', key: 'category' as const },
                { label: 'Marka ⌄', key: 'brand' as const },
                { label: 'Fiyat ⌄', key: 'price' as const }
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => toggleMobilePanel(item.key)}
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-[13px] ${
                    mobilePanel === item.key ? 'border-[#f27a1a] bg-[#fff8f2] text-[#f27a1a]' : 'border-[#e4e4e4] bg-white text-[#555]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {mobilePanel ? (
              <div className="mt-2 rounded-xl border border-[#ececec] bg-white p-3">
                {mobilePanel === 'sort' ? (
                  <div className="space-y-1">
                    {['Önerilen', 'En Düşük Fiyat', 'En Yüksek Fiyat', 'En Çok Değerlendirilen'].map((item) => (
                      <button key={item} className="block w-full rounded-md px-2 py-2 text-left text-[13px] text-[#444] hover:bg-[#f8f8f8]">
                        {item}
                      </button>
                    ))}
                  </div>
                ) : null}

                {mobilePanel === 'filter' ? (
                  <div className="space-y-1">
                    {filterOptions.advantage.map((item) => (
                      <CheckItem
                        key={item}
                        label={item}
                        checked={selected.advantage.includes(item)}
                        onChange={() => toggleOption('advantage', item)}
                      />
                    ))}
                  </div>
                ) : null}

                {mobilePanel === 'category' ? (
                  <div className="space-y-1">
                    {filterOptions.category.map((item) => (
                      <CheckItem
                        key={item}
                        label={item}
                        checked={selected.category.includes(item)}
                        onChange={() => toggleOption('category', item)}
                      />
                    ))}
                  </div>
                ) : null}

                {mobilePanel === 'brand' ? (
                  <div className="space-y-1">
                    <input
                      className="mb-2 h-9 w-full rounded border border-[#ececec] px-3 text-[13px] outline-none"
                      placeholder="Marka Ara"
                      value={brandQuery}
                      onChange={(e) => setBrandQuery(e.target.value)}
                    />
                    {filteredBrands.map((item) => (
                      <CheckItem key={item} label={item} checked={selected.brand.includes(item)} onChange={() => toggleOption('brand', item)} />
                    ))}
                  </div>
                ) : null}

                {mobilePanel === 'price' ? (
                  <div className="space-y-1">
                    {mobilePriceOptions.map((item) => (
                      <CheckItem key={item} label={item} checked={selectedPrices.includes(item)} onChange={() => togglePriceOption(item)} />
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {mobileGridProducts.map((item, index) => (
              <MobileGridCard key={`${item.title}-${index}`} {...item} />
            ))}
          </div>
        </div>
      </section>

      <div className="h-4 lg:hidden" />
    </main>
  );
}
