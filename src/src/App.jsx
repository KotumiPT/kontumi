
import React, { useState } from 'react';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Plus,
  Home,
  PieChart,
  Target,
  Settings,
  ArrowUpRight,
  ArrowDownRight,
  ShoppingBag,
  Car,
  Utensils,
  Heart,
  X
} from 'lucide-react';

const initialTransactions = [
  {
    id: 1,
    title: 'Supermercado',
    category: 'Alimentação',
    amount: -86.45,
    date: 'Hoje',
    icon: ShoppingBag,
    color: '#E9F5EF'
  },
  {
    id: 2,
    title: 'Combustível',
    category: 'Transportes',
    amount: -55,
    date: 'Ontem',
    icon: Car,
    color: '#FFF2E5'
  },
  {
    id: 3,
    title: 'Restaurante',
    category: 'Lazer',
    amount: -32.50,
    date: 'Ontem',
    icon: Utensils,
    color: '#F1EDFF'
  },
  {
    id: 4,
    title: 'Salário',
    category: 'Rendimento',
    amount: 1650,
    date: '05 Nov',
    icon: Wallet,
    color: '#E8F5F0'
  }
];

export default function App() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('Início');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Alimentação');

  const income = transactions
    .filter(item => item.amount > 0)
    .reduce((sum, item) => sum + item.amount, 0);

  const expenses = transactions
    .filter(item => item.amount < 0)
    .reduce((sum, item) => sum + Math.abs(item.amount), 0);

  const balance = income - expenses;

  function addTransaction(e) {
    e.preventDefault();

    if (!title.trim() || !amount || Number(amount) <= 0) return;

    const icons = {
      Alimentação: ShoppingBag,
      Transportes: Car,
      Lazer: Heart,
      Casa: Home,
      Outros: Wallet
    };

    const newTransaction = {
      id: Date.now(),
      title: title.trim(),
      category,
      amount: -Number(amount),
      date: 'Hoje',
      icon: icons[category] || Wallet,
      color: '#E9F5EF'
    };

    setTransactions([newTransaction, ...transactions]);
    setTitle('');
    setAmount('');
    setCategory('Alimentação');
    setShowForm(false);
  }

  const navItems = [
    { name: 'Início', icon: Home },
    { name: 'Movimentos', icon: Wallet },
    { name: 'Orçamento', icon: PieChart },
    { name: 'Objetivos', icon: Target }
  ];

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <div className="brand">KONTUMI<span>.</span></div>
          <p className="welcome">O teu dinheiro, mais simples.</p>
        </div>
        <button className="profile-button" aria-label="Perfil">
          B
        </button>
      </header>

      <main className="main-content">
        {activeTab === 'Início' && (
          <>
            <section className="balance-card">
              <div className="balance-top">
                <span>Saldo disponível</span>
                <Wallet size={21} />
              </div>

              <h1>
                {balance.toLocaleString('pt-PT', {
                  style: 'currency',
                  currency: 'EUR'
                })}
              </h1>

              <div className="balance-footer">
                <span>Visão geral deste mês</span>
                <span className="balance-badge">● Atualizado</span>
              </div>
            </section>

            <section className="summary-grid">
              <div className="summary-card">
                <div className="summary-icon income-icon">
                  <TrendingUp size={19} />
                </div>
                <span>Receitas</span>
                <strong>
                  {income.toLocaleString('pt-PT', {
                    style: 'currency',
                    currency: 'EUR'
                  })}
                </strong>
              </div>

              <div className="summary-card">
                <div className="summary-icon expense-icon">
                  <TrendingDown size={19} />
                </div>
                <span>Despesas</span>
                <strong>
                  {expenses.toLocaleString('pt-PT', {
                    style: 'currency',
                    currency: 'EUR'
                  })}
                </strong>
              </div>
            </section>

            <section className="budget-card">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">CONTROLO MENSAL</span>
                  <h2>O teu orçamento</h2>
                </div>
                <span className="budget-label">Novembro</span>
              </div>

              <div className="budget-numbers">
                <strong>€ 2.000,00</strong>
                <span>Orçamento definido</span>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: `${Math.min((expenses / 2000) * 100, 100)}%`
                  }}
                />
              </div>

              <div className="budget-bottom">
                <span>
                  {Math.round((expenses / 2000) * 100)}% utilizado
                </span>
                <strong>
                  {Math.max(2000 - expenses, 0).toLocaleString('pt-PT', {
                    style: 'currency',
                    currency: 'EUR'
                  })} restante
                </strong>
              </div>
            </section>

            <section className="transactions-section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">ACOMPANHAMENTO</span>
                  <h2>Movimentos recentes</h2>
                </div>
                <button
                  className="see-all"
                  onClick={() => setActiveTab('Movimentos')}
                >
                  Ver todos
                </button>
              </div>

              <div className="transaction-list">
                {transactions.slice(0, 5).map(item => {
                  const Icon = item.icon;

                  return (
                    <div className="transaction-item" key={item.id}>
                      <div
                        className="transaction-icon"
                        style={{ background: item.color }}
                      >
                        <Icon size={19} />
                      </div>

                      <div className="transaction-info">
                        <strong>{item.title}</strong>
                        <span>{item.category} · {item.date}</span>
                      </div>

                      <strong
                        className={
                          item.amount > 0 ? 'amount-positive' : 'amount-negative'
                        }
                      >
                        {item.amount > 0 ? '+' : ''}
                        {item.amount.toLocaleString('pt-PT', {
                          style: 'currency',
                          currency: 'EUR'
                        })}
                      </strong>
                    </div>
                  );
                })}
              </div>
            </section>

            <button className="add-button" onClick={() => setShowForm(true)}>
              <Plus size={21} />
              Nova despesa
            </button>
          </>
        )}

        {activeTab === 'Movimentos' && (
          <section className="transactions-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">HISTÓRICO</span>
                <h2>Todos os movimentos</h2>
              </div>
            </div>

            <div className="transaction-list">
              {transactions.map(item => {
                const Icon = item.icon;

                return (
                  <div className="transaction-item" key={item.id}>
                    <div
                      className="transaction-icon"
                      style={{ background: item.color }}
                    >
                      <Icon size={19} />
                    </div>
                    <div className="transaction-info">
                      <strong>{item.title}</strong>
                      <span>{item.category} · {item.date}</span>
                    </div>
                    <strong className={item.amount > 0 ? 'amount-positive' : 'amount-negative'}>
                      {item.amount > 0 ? '+' : ''}
                      {item.amount.toLocaleString('pt-PT', {
                        style: 'currency',
                        currency: 'EUR'
                      })}
                    </strong>
                  </div>
                );
              })}
            </div>

            <button className="add-button" onClick={() => setShowForm(true)}>
              <Plus size={21} />
              Nova despesa
            </button>
          </section>
        )}

        {activeTab === 'Orçamento' && (
          <section className="budget-card">
            <span className="eyebrow">PLANEAMENTO</span>
            <h2>O teu orçamento</h2>
            <p>Em breve vais poder organizar os teus limites por categoria.</p>
          </section>
        )}

        {activeTab === 'Objetivos' && (
          <section className="budget-card">
            <span className="eyebrow">POUPANÇA</span>
            <h2>Os teus objetivos</h2>
            <p>Em breve vais poder criar objetivos e acompanhar a tua evolução.</p>
          </section>
        )}
      </main>

      <nav className="bottom-nav">
        {navItems.map(item => {
          const Icon = item.icon;
          const active = activeTab === item.name;

          return (
            <button
              key={item.name}
              className={`nav-item ${active ? 'active' : ''}`}
              onClick={() => setActiveTab(item.name)}
            >
              <Icon size={21} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <form
            className="expense-form"
            onSubmit={addTransaction}
            onClick={e => e.stopPropagation()}
          >
            <div className="form-heading">
              <div>
                <span className="eyebrow">NOVO MOVIMENTO</span>
                <h2>Adicionar despesa</h2>
              </div>
              <button
                type="button"
                className="close-button"
                onClick={() => setShowForm(false)}
              >
                <X size={21} />
              </button>
            </div>

            <label>Descrição</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ex.: Compras do supermercado"
              required
            />

            <label>Valor (€)</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="0,00"
              required
            />

            <label>Categoria</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option>Alimentação</option>
              <option>Transportes</option>
              <option>Lazer</option>
              <option>Casa</option>
              <option>Outros</option>
            </select>

            <button type="submit" className="add-button form-submit">
              Guardar despesa
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
