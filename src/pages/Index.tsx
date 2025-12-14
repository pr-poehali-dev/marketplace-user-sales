import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  seller: string;
}

interface SellerStats {
  totalSales: number;
  revenue: number;
  products: number;
  views: number;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);

  const products: Product[] = [
    { id: 1, name: 'Винтажная камера', price: 15000, image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400', category: 'Электроника', seller: 'Антон К.' },
    { id: 2, name: 'Дизайнерский стул', price: 8500, image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400', category: 'Мебель', seller: 'Мария П.' },
    { id: 3, name: 'Кожаная сумка', price: 12000, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400', category: 'Аксессуары', seller: 'Дмитрий Л.' },
    { id: 4, name: 'Настольная лампа', price: 4500, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400', category: 'Декор', seller: 'Ольга С.' },
    { id: 5, name: 'Наушники премиум', price: 22000, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', category: 'Электроника', seller: 'Игорь В.' },
    { id: 6, name: 'Керамическая ваза', price: 3200, image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400', category: 'Декор', seller: 'Елена М.' },
  ];

  const sellerStats: SellerStats = {
    totalSales: 127,
    revenue: 456780,
    products: 24,
    views: 8543
  };

  const salesData = [
    { month: 'Янв', sales: 32000 },
    { month: 'Фев', sales: 45000 },
    { month: 'Мар', sales: 38000 },
    { month: 'Апр', sales: 52000 },
    { month: 'Май', sales: 61000 },
    { month: 'Июн', sales: 73000 },
  ];

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const toggleCart = (id: number) => {
    setCart(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-fade-in">
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/90 hover:bg-white"
          onClick={() => toggleFavorite(product.id)}
        >
          <Icon 
            name={favorites.includes(product.id) ? "Heart" : "Heart"} 
            size={20}
            className={favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""}
          />
        </Button>
      </div>
      <CardContent className="p-4">
        <Badge variant="secondary" className="mb-2">{product.category}</Badge>
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{product.seller}</p>
        <p className="text-xl font-bold text-primary">{product.price.toLocaleString('ru-RU')} ₽</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          onClick={() => toggleCart(product.id)}
          variant={cart.includes(product.id) ? "secondary" : "default"}
        >
          <Icon name={cart.includes(product.id) ? "Check" : "ShoppingCart"} size={18} className="mr-2" />
          {cart.includes(product.id) ? "В корзине" : "В корзину"}
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-primary">MarketPlace</h1>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Icon name="Heart" size={22} />
                {favorites.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {favorites.length}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Icon name="ShoppingCart" size={22} />
                {cart.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {cart.length}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="User" size={22} />
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="home">
                <Icon name="Home" size={18} className="mr-2" />
                Главная
              </TabsTrigger>
              <TabsTrigger value="catalog">
                <Icon name="Grid3x3" size={18} className="mr-2" />
                Каталог
              </TabsTrigger>
              <TabsTrigger value="seller">
                <Icon name="Store" size={18} className="mr-2" />
                Мой магазин
              </TabsTrigger>
              <TabsTrigger value="favorites">
                <Icon name="Heart" size={18} className="mr-2" />
                Избранное
              </TabsTrigger>
              <TabsTrigger value="profile">
                <Icon name="User" size={18} className="mr-2" />
                Профиль
              </TabsTrigger>
            </TabsList>

            <TabsContent value="home" className="mt-6">
              <div className="mb-6">
                <div className="relative">
                  <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Поиск товаров..."
                    className="pl-10 h-12"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Популярные товары</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="catalog" className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Все товары</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="seller" className="mt-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-6">Панель продавца</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <Card className="animate-scale-in">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <Icon name="ShoppingBag" size={24} className="text-primary" />
                        <Badge variant="secondary">+12%</Badge>
                      </div>
                      <p className="text-3xl font-bold mb-1">{sellerStats.totalSales}</p>
                      <p className="text-sm text-muted-foreground">Продаж</p>
                    </CardContent>
                  </Card>

                  <Card className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <Icon name="DollarSign" size={24} className="text-green-600" />
                        <Badge variant="secondary">+8%</Badge>
                      </div>
                      <p className="text-3xl font-bold mb-1">{sellerStats.revenue.toLocaleString('ru-RU')} ₽</p>
                      <p className="text-sm text-muted-foreground">Выручка</p>
                    </CardContent>
                  </Card>

                  <Card className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <Icon name="Package" size={24} className="text-orange-600" />
                        <Badge variant="secondary">+3</Badge>
                      </div>
                      <p className="text-3xl font-bold mb-1">{sellerStats.products}</p>
                      <p className="text-sm text-muted-foreground">Товаров</p>
                    </CardContent>
                  </Card>

                  <Card className="animate-scale-in" style={{ animationDelay: '0.3s' }}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <Icon name="Eye" size={24} className="text-blue-600" />
                        <Badge variant="secondary">+24%</Badge>
                      </div>
                      <p className="text-3xl font-bold mb-1">{sellerStats.views.toLocaleString('ru-RU')}</p>
                      <p className="text-sm text-muted-foreground">Просмотров</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="animate-fade-in">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-6">Динамика продаж</h3>
                    <div className="space-y-4">
                      {salesData.map((data, index) => {
                        const maxSales = Math.max(...salesData.map(d => d.sales));
                        const width = (data.sales / maxSales) * 100;
                        return (
                          <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">{data.month}</span>
                              <span className="text-sm font-bold text-primary">{data.sales.toLocaleString('ru-RU')} ₽</span>
                            </div>
                            <div className="h-8 bg-secondary rounded-lg overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-lg transition-all duration-1000 ease-out flex items-center justify-end pr-3"
                                style={{ width: `${width}%` }}
                              >
                                <span className="text-xs text-white font-medium">
                                  {Math.round(width)}%
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-6">
                  <Button size="lg" className="w-full">
                    <Icon name="Plus" size={20} className="mr-2" />
                    Добавить новый товар
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="favorites" className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Избранное ({favorites.length})</h2>
              {favorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.filter(p => favorites.includes(p.id)).map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <Icon name="Heart" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg text-muted-foreground">Здесь появятся ваши избранные товары</p>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="User" size={40} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-1">Ваш профиль</h3>
                      <p className="text-muted-foreground">Управление личными данными</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Имя</label>
                      <Input placeholder="Иван Петров" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <Input type="email" placeholder="ivan@example.com" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Телефон</label>
                      <Input type="tel" placeholder="+7 (999) 123-45-67" />
                    </div>
                    <Button className="w-full" size="lg">
                      <Icon name="Save" size={20} className="mr-2" />
                      Сохранить изменения
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </header>
    </div>
  );
};

export default Index;