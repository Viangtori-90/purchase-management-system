import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Главная страница
function HomePage() {
  return (
    <div style={{ 
      padding: '40px', 
      textAlign: 'center',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <h1 style={{ color: '#2d3436' }}>🏢 Purchase Management System</h1>
      <p style={{ fontSize: '1.1em', color: '#636e72', marginBottom: '40px' }}>
        Полнофункциональная система управления закупками
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
        <Link 
          to="/customers" 
          style={{
            padding: '15px 30px',
            backgroundColor: '#4263eb',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '1.1em'
          }}
        >
          👥 Управление контрагентами
        </Link>
        
        <Link 
          to="/lots" 
          style={{
            padding: '15px 30px',
            backgroundColor: '#20c997',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '1.1em'
          }}
        >
          📦 Управление лотами
        </Link>
      </div>
    </div>
  );
}

// Страница контрагентов - ВСТАВЬ СЮДА РАБОЧИЙ КОД ИЗ ПРЕДЫДУЩЕЙ ВЕРСИИ
function CustomersPage() {
  // ⬇️⬇️⬇️ ВСТАВЬ СЮДА ВЕСЬ РАБОЧИЙ КОД ИЗ ТОЙ ВЕРСИИ, КОТОРАЯ ПОКАЗЫВАЛА КОНТРАГЕНТОВ ⬇️⬇️⬇️
  // Тот самый код, который работал и показывал таблицу с контрагентами и лотами
  // Начни копировать отсюда:
  
  const [customers, setCustomers] = useState([]);
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState({ customers: false, lots: false });
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formData, setFormData] = useState({
    customerCode: '',
    customerName: '',
    customerEmail: '',
    phone: '',
    isOrganization: true,
  });

  // Загрузка данных
  const loadCustomers = async () => {
    setLoading({ ...loading, customers: true });
    try {
      const response = await fetch('http://localhost:8081/api/customers');
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      alert('Ошибка загрузки: ' + error.message);
    } finally {
      setLoading({ ...loading, customers: false });
    }
  };

  const loadLots = async () => {
    setLoading({ ...loading, lots: true });
    try {
      const response = await fetch('http://localhost:8081/api/lots');
      const data = await response.json();
      setLots(data);
    } catch (error) {
      alert('Ошибка загрузки: ' + error.message);
    } finally {
      setLoading({ ...loading, lots: false });
    }
  };

  // Автозагрузка при старте
  useEffect(() => {
    loadCustomers();
    loadLots();
  }, []);

  // Фильтрация
  const filteredCustomers = customers.filter(customer =>
    customer.customerName.toLowerCase().includes(search.toLowerCase()) ||
    customer.customerCode.toLowerCase().includes(search.toLowerCase())
  );

  // Обработчики
  const handleAdd = () => {
    setSelectedCustomer(null);
    setFormData({
      customerCode: '',
      customerName: '',
      customerEmail: '',
      phone: '',
      isOrganization: true,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setFormData({ ...customer });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Удалить контрагента?')) {
      try {
        await fetch(`http://localhost:8081/api/customers/${id}`, {
          method: 'DELETE',
        });
        await loadCustomers();
        alert('Контрагент удалён');
      } catch (error) {
        alert('Ошибка удаления');
      }
    }
  };

  const handleSave = async () => {
    try {
      const url = selectedCustomer 
        ? `http://localhost:8081/api/customers/${selectedCustomer.customerCode}`
        : 'http://localhost:8081/api/customers';
      
      const method = selectedCustomer ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(selectedCustomer ? 'Контрагент обновлён' : 'Контрагент создан');
        setIsModalOpen(false);
        await loadCustomers();
      } else {
        throw new Error('Ошибка сервера');
      }
    } catch (error) {
      alert('Ошибка сохранения: ' + error.message);
    }
  };

  // Стили
  const styles = {
    container: {
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    },
    header: {
      backgroundColor: '#ffffff',
      padding: '25px',
      borderRadius: '10px',
      marginBottom: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '20px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    button: {
      padding: '10px 20px',
      marginRight: '10px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'all 0.3s'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '15px'
    },
    th: {
      backgroundColor: '#f1f3f5',
      padding: '15px',
      textAlign: 'left',
      borderBottom: '2px solid #dee2e6',
      color: '#495057',
      fontWeight: '600'
    },
    td: {
      padding: '12px 15px',
      borderBottom: '1px solid #e9ecef',
      color: '#212529'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    modalContent: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '10px',
      minWidth: '400px',
      maxWidth: '500px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
    },
    input: {
      width: '100%',
      padding: '12px',
      marginBottom: '20px',
      border: '1px solid #ced4da',
      borderRadius: '6px',
      fontSize: '16px',
      boxSizing: 'border-box'
    },
    badge: {
      display: 'inline-block',
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '0.85em',
      fontWeight: '500',
      marginRight: '5px'
    },
    actionButtons: {
      display: 'flex',
      gap: '5px'
    },
    navigation: {
      display: 'flex',
      gap: '15px',
      marginBottom: '20px'
    },
    navLink: {
      color: '#4263eb',
      textDecoration: 'none',
      fontWeight: '500',
      padding: '8px 15px',
      borderRadius: '6px',
      backgroundColor: '#edf2ff',
      transition: 'all 0.3s'
    },
    activeNavLink: {
      backgroundColor: '#4263eb',
      color: 'white'
    }
  };

  return (
    <div style={styles.container}>
      
      {/* Навигация */}
      <div style={styles.navigation}>
        <Link 
          to="/" 
          style={styles.navLink}
        >
          🏠 Главная
        </Link>
        <Link 
          to="/customers" 
          style={{ ...styles.navLink, ...styles.activeNavLink }}
        >
          👥 Контрагенты
        </Link>
        <Link 
          to="/lots" 
          style={styles.navLink}
        >
          📦 Лоты
        </Link>
      </div>

      {/* Заголовок */}
      <div style={styles.header}>
        <div>
          <h1 style={{ margin: 0, color: '#2d3436' }}>👥 Управление контрагентами</h1>
          <p style={{ margin: '5px 0 0 0', color: '#636e72' }}>Создание, редактирование и удаление контрагентов</p>
        </div>
        
        <div>
          <button 
            style={{ 
              ...styles.button, 
              backgroundColor: '#4263eb', 
              color: 'white'
            }}
            onClick={() => { loadCustomers(); loadLots(); }}
            disabled={loading.customers || loading.lots}
          >
            {loading.customers || loading.lots ? '⏳ Загрузка...' : '🔄 Обновить данные'}
          </button>
          <button 
            style={{ 
              ...styles.button, 
              backgroundColor: '#20c997', 
              color: 'white'
            }}
            onClick={handleAdd}
          >
            ➕ Добавить контрагента
          </button>
        </div>
      </div>

      {/* Поиск и статистика */}
      <div style={styles.card}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="🔍 Поиск контрагентов по названию или коду..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ 
              ...styles.input, 
              marginBottom: 0, 
              flex: 1,
              backgroundImage: 'none'
            }}
          />
          
          <div style={{ display: 'flex', gap: '15px', whiteSpace: 'nowrap' }}>
            <span style={{ ...styles.badge, backgroundColor: '#e7f5ff', color: '#1864ab' }}>
              👥 Контрагентов: {customers.length}
            </span>
            <span style={{ ...styles.badge, backgroundColor: '#d3f9d8', color: '#0b7285' }}>
              📦 Лотов: {lots.length}
            </span>
          </div>
        </div>
      </div>

      {/* Таблица контрагентов */}
      <div style={{ ...styles.card, flex: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, color: '#495057' }}>📋 Список контрагентов</h2>
          <button 
            style={{ 
              ...styles.button, 
              backgroundColor: '#51cf66', 
              color: 'white',
              padding: '8px 15px',
              fontSize: '14px'
            }}
            onClick={handleAdd}
          >
            ➕ Добавить
          </button>
        </div>

        {loading.customers ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Загрузка контрагентов...</p>
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Код</th>
                <th style={styles.th}>Наименование</th>
                <th style={styles.th}>Контакты</th>
                <th style={styles.th}>Тип</th>
                <th style={styles.th}>Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map(customer => (
                <tr key={customer.customerCode} style={{ 
                  backgroundColor: customer.isOrganization ? '#f8f9fa' : '#fff',
                  transition: 'background-color 0.2s'
                }}>
                  <td style={styles.td}>
                    <strong>{customer.customerCode}</strong>
                  </td>
                  <td style={styles.td}>
                    <div style={{ fontWeight: 'bold' }}>{customer.customerName}</div>
                    <div style={{ fontSize: '0.9em', color: '#6c757d' }}>{customer.customerEmail}</div>
                  </td>
                  <td style={styles.td}>
                    <span style={{ ...styles.badge, backgroundColor: '#e7f5ff', color: '#1864ab' }}>
                      📞 {customer.phone}
                    </span>
                  </td>
                  <td style={styles.td}>
                    {customer.isOrganization ? (
                      <span style={{ ...styles.badge, backgroundColor: '#d3f9d8', color: '#0b7285' }}>
                        🏢 Юр.лицо
                      </span>
                    ) : (
                      <span style={{ ...styles.badge, backgroundColor: '#fff3bf', color: '#e67700' }}>
                        👤 Физ.лицо
                      </span>
                    )}
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actionButtons}>
                      <button
                        style={{ 
                          ...styles.button, 
                          backgroundColor: '#339af0', 
                          color: 'white',
                          padding: '5px 10px',
                          fontSize: '12px',
                          marginRight: 0
                        }}
                        onClick={() => handleEdit(customer)}
                      >
                        ✏️
                      </button>
                      <button
                        style={{ 
                          ...styles.button, 
                          backgroundColor: '#fa5252', 
                          color: 'white',
                          padding: '5px 10px',
                          fontSize: '12px',
                          marginRight: 0
                        }}
                        onClick={() => handleDelete(customer.customerCode)}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Лоты (боковая панель) */}
      <div style={{ ...styles.card, flex: 1, marginTop: '20px' }}>
        <h2 style={{ margin: '0 0 20px 0', color: '#495057' }}>📦 Последние лоты</h2>
        
        {loading.lots ? (
          <p>Загрузка лотов...</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {lots.slice(0, 3).map(lot => (
              <div 
                key={lot.id} 
                style={{ 
                  padding: '15px',
                  borderLeft: '4px solid #20c997',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '6px'
                }}
              >
                <div style={{ fontWeight: 'bold', marginBottom: '5px', color: '#2d3436' }}>
                  {lot.lotName}
                </div>
                <div style={{ fontSize: '0.9em', color: '#636e72' }}>
                  <div>💰 {lot.price} {lot.currencyCode}</div>
                  <div>📍 {lot.placeDelivery}</div>
                  <div>👤 Контрагент: {lot.customerCode}</div>
                </div>
              </div>
            ))}
            
            {lots.length > 3 && (
              <div style={{ 
                textAlign: 'center', 
                marginTop: '10px', 
                color: '#4263eb',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
              onClick={() => alert(`Всего лотов: ${lots.length}`)}
              >
                📊 и ещё {lots.length - 3} лотов...
              </div>
            )}
          </div>
        )}
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2 style={{ marginTop: 0, color: '#2d3436' }}>
              {selectedCustomer ? '✏️ Редактировать контрагента' : '➕ Добавить контрагента'}
            </h2>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                Код контрагента *
              </label>
              <input
                type="text"
                value={formData.customerCode}
                onChange={(e) => setFormData({ ...formData, customerCode: e.target.value })}
                disabled={!!selectedCustomer}
                placeholder="Например: CUST006"
                style={styles.input}
              />
              
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                Наименование *
              </label>
              <input
                type="text"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                placeholder="Полное наименование"
                style={styles.input}
              />
              
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                Email
              </label>
              <input
                type="email"
                value={formData.customerEmail}
                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                placeholder="email@example.com"
                style={styles.input}
              />
              
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                Телефон
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+7 (XXX) XXX-XX-XX"
                style={styles.input}
              />
              
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.isOrganization}
                  onChange={(e) => setFormData({ ...formData, isOrganization: e.target.checked })}
                  style={{ width: '18px', height: '18px' }}
                />
                <span>Юридическое лицо</span>
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                style={{ 
                  ...styles.button, 
                  backgroundColor: '#adb5bd', 
                  color: 'white'
                }}
                onClick={() => setIsModalOpen(false)}
              >
                Отмена
              </button>
              <button
                style={{ 
                  ...styles.button, 
                  backgroundColor: selectedCustomer ? '#f59f00' : '#20c997', 
                  color: 'white'
                }}
                onClick={handleSave}
              >
                {selectedCustomer ? '💾 Сохранить' : '✨ Создать'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
  // ⬆️⬆️⬆️ КОНЕЦ КОДА ДЛЯ СТРАНИЦЫ КОНТРАГЕНТОВ ⬆️⬆️⬆️
}

// Страница лотов (упрощённая)
function LotsPage() {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadLots();
  }, []);

  const loadLots = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8081/api/lots');
      const data = await response.json();
      setLots(data);
    } catch (error) {
      alert('Ошибка загрузки: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        <Link 
          to="/" 
          style={{
            color: '#4263eb',
            textDecoration: 'none',
            fontWeight: '500',
            padding: '8px 15px',
            borderRadius: '6px',
            backgroundColor: '#edf2ff'
          }}
        >
          🏠 Главная
        </Link>
        <Link 
          to="/customers" 
          style={{
            color: '#4263eb',
            textDecoration: 'none',
            fontWeight: '500',
            padding: '8px 15px',
            borderRadius: '6px',
            backgroundColor: '#edf2ff'
          }}
        >
          👥 Контрагенты
        </Link>
        <Link 
          to="/lots" 
          style={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: '500',
            padding: '8px 15px',
            borderRadius: '6px',
            backgroundColor: '#20c997'
          }}
        >
          📦 Лоты
        </Link>
      </div>
      
      <h1 style={{ color: '#2d3436' }}>📦 Управление лотами</h1>
      <p style={{ color: '#636e72', marginBottom: '20px' }}>Просмотр и управление лотами</p>
      
      <button 
        onClick={loadLots} 
        disabled={loading}
        style={{ 
          padding: '10px 20px',
          backgroundColor: '#4263eb',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        {loading ? '⏳ Загрузка...' : '🔄 Обновить список'}
      </button>
      
      {loading ? (
        <p>Загрузка лотов...</p>
      ) : (
        <div>
          <div style={{ 
            backgroundColor: '#d3f9d8', 
            padding: '15px', 
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h3 style={{ margin: 0 }}>📊 Статистика</h3>
            <p>Всего лотов: <strong>{lots.length}</strong></p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {lots.map(lot => (
              <div 
                key={lot.id}
                style={{ 
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  borderLeft: '4px solid #20c997'
                }}
              >
                <h3 style={{ marginTop: 0, color: '#2d3436' }}>{lot.lotName}</h3>
                <div style={{ color: '#636e72' }}>
                  <p><strong>$ Цена:</strong> {lot.price} {lot.currencyCode}</p>
                  <p><strong>🏷️ НДС:</strong> {lot.ndsRate}</p>
                  <p><strong>📍 Доставка:</strong> {lot.placeDelivery}</p>
                  <p><strong>👤 Контрагент:</strong> {lot.customerCode}</p>
                  {lot.dateDelivery && (
                    <p><strong>📅 Дата:</strong> {new Date(lot.dateDelivery).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Главный компонент App
function App() {
  return (
    <Router>
      <div style={{ 
        minHeight: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/lots" element={<LotsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;