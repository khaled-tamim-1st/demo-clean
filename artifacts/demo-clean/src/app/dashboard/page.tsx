'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  MessageSquare,
  Star,
  Clock,
  PhoneCall,
  CheckCircle2,
  Trash2,
  Filter,
  RefreshCw,
  Search,
  Plus,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Building,
  Check,
  X,
  MessageCircle,
  Lock,
  LogOut,
  Eye,
  EyeOff,
} from 'lucide-react';
import type { LeadItem, ReviewItem } from '@/lib/db';

const DASHBOARD_PASSWORD = 'Aa@12345';
const AUTH_STORAGE_KEY = 'demo_clean_admin_authed';

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [activeTab, setActiveTab] = useState<'leads' | 'reviews'>('leads');
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'contacted' | 'completed'>('all');
  const [reviewStatusFilter, setReviewStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  // New review form state
  const [newReview, setNewReview] = useState({
    authorName: '',
    governorateName: 'حولي',
    areaName: 'السالمية',
    serviceName: 'مكافحة الصراصير بالجل الألماني',
    rating: 5,
    comment: '',
    source: 'google' as 'google' | 'website',
    date: new Date().toISOString().split('T')[0],
  });
  const [copiedReviewLink, setCopiedReviewLink] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [leadsRes, reviewsRes] = await Promise.all([
        fetch('/api/dashboard/leads'),
        fetch('/api/dashboard/reviews'),
      ]);
      const leadsData = await leadsRes.json();
      const reviewsData = await reviewsRes.json();

      if (leadsData.success) setLeads(leadsData.leads);
      if (reviewsData.success) setReviews(reviewsData.reviews);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Check saved authentication on mount
  useEffect(() => {
    const isAuthed = sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    setIsAuthenticated(isAuthed);
    if (isAuthed) {
      fetchData();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === DASHBOARD_PASSWORD) {
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      setIsAuthenticated(true);
      setPasswordError('');
      fetchData();
    } else {
      setPasswordError('كلمة المرور غير صحيحة، يرجى المحاولة مرة أخرى.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  const handleUpdateStatus = async (id: number | string, status: LeadItem['status']) => {
    try {
      const res = await fetch('/api/dashboard/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (String(l.id) === String(id) ? { ...l, status } : l))
        );
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDeleteLead = async (id: number | string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الطلب؟')) return;
    try {
      const res = await fetch(`/api/dashboard/leads?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => String(l.id) !== String(id)));
      }
    } catch (err) {
      console.error('Error deleting lead:', err);
    }
  };

  const handleUpdateReviewStatus = async (id: string, status: 'approved' | 'pending' | 'rejected') => {
    try {
      const res = await fetch('/api/dashboard/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setReviews((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status } : r))
        );
      }
    } catch (err) {
      console.error('Error updating review status:', err);
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا التقييم؟')) return;
    try {
      const res = await fetch(`/api/dashboard/reviews?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (err) {
      console.error('Error deleting review:', err);
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/dashboard/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
      });
      const data = await res.json();
      if (data.success) {
        setReviews((prev) => [data.review, ...prev]);
        setShowAddReviewModal(false);
        setNewReview({
          authorName: '',
          governorateName: 'حولي',
          areaName: 'السالمية',
          serviceName: 'مكافحة الصراصير بالجل الألماني',
          rating: 5,
          comment: '',
          source: 'google',
          date: new Date().toISOString().split('T')[0],
        });
      }
    } catch (err) {
      console.error('Error adding review:', err);
    }
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.governorate.includes(searchTerm) ||
      lead.service.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stats calculation
  const newLeadsCount = leads.filter((l) => l.status === 'new').length;
  const contactedCount = leads.filter((l) => l.status === 'contacted').length;
  const completedCount = leads.filter((l) => l.status === 'completed').length;
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '5.0';

  // While checking session
  if (isAuthenticated === null) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#f5f7f3' }}>
        <div style={{ color: '#687770', fontSize: '14px', fontWeight: 600 }}>جاري التحقق من الصلاحيات...</div>
      </div>
    );
  }

  // Password Lock Screen
  if (!isAuthenticated) {
    return (
      <div
        dir="rtl"
        style={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          background: 'linear-gradient(135deg, #18354b 0%, #1e455e 100%)',
          padding: '20px',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            width: '100%',
            maxWidth: '430px',
            borderRadius: '16px',
            padding: '36px 30px',
            boxShadow: '0 20px 45px rgba(0,0,0,0.25)',
            textAlign: 'center',
          }}
        >
          {/* Logo / Badge */}
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#eef5e7',
              color: '#2a5534',
              display: 'grid',
              placeItems: 'center',
              margin: '0 auto 18px',
              boxShadow: '0 0 0 8px rgba(84, 136, 58, 0.1)',
            }}
          >
            <Lock size={28} style={{ color: '#54883a' }} />
          </div>

          <h2 style={{ fontSize: '21px', fontWeight: 800, color: '#17354a', margin: '0 0 8px' }}>
            لوحة تحكم ديمو كلين
          </h2>
          <p style={{ margin: '0 0 24px', fontSize: '13px', color: '#6a7972', lineHeight: 1.7 }}>
            هذه الصفحة مخصصة لإدارة الشركة فقط. يرجى إدخال كلمة المرور للمتابعة.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ position: 'relative', textAlign: 'right' }}>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#3d4d46', marginBottom: '6px' }}>
                كلمة المرور:
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  placeholder="أدخل كلمة المرور..."
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setPasswordError('');
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 40px 12px 14px',
                    borderRadius: '10px',
                    border: passwordError ? '1px solid #dc2626' : '1px solid #cdd6cb',
                    fontSize: '14px',
                    outline: 'none',
                    direction: 'ltr',
                    textAlign: 'left',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#8d9c92',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {passwordError && (
              <div
                style={{
                  background: '#fef2f2',
                  color: '#dc2626',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #fecaca',
                  textAlign: 'right',
                }}
              >
                {passwordError}
              </div>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                background: '#204733',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(32, 71, 51, 0.3)',
                marginTop: '4px',
              }}
            >
              تسجيل الدخول إلى اللوحة
            </button>
          </form>

          <div style={{ marginTop: '22px', borderTop: '1px solid #eef1ea', paddingTop: '16px' }}>
            <Link
              href="/"
              style={{
                fontSize: '12.5px',
                color: '#55803f',
                textDecoration: 'none',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>العودة إلى الصفحة الرئيسية للموقع</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" style={{ background: '#f5f7f3', minHeight: '100vh', padding: '30px 20px 80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Top Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '26px',
          background: '#fff',
          padding: '20px 24px',
          borderRadius: '14px',
          border: '1px solid #dce2d6',
          boxShadow: '0 4px 14px rgba(23,53,74,0.04)',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#54883a' }} />
              <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0, color: '#17354a' }}>
                لوحة تحكم ديمو كلين (Demo Clean Admin)
              </h1>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#687770' }}>
              إدارة طلبات المعاينة المباشرة (Leads)، استفسارات العملاء، والآراء والتقييمات
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={fetchData}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 16px',
                background: '#f1f5ec',
                border: '1px solid #c9d8bd',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#2a5534',
                cursor: 'pointer',
              }}
            >
              <RefreshCw size={14} className={loading ? 'spin' : ''} />
              <span>تحديث البيانات</span>
            </button>
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 16px',
                background: '#18364b',
                color: '#fff',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <span>معاينة الموقع الحي</span>
              <ExternalLink size={14} />
            </Link>
            <button
              onClick={handleLogout}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 14px',
                background: '#fee2e2',
                color: '#991b1b',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
              title="تسجيل الخروج من اللوحة"
            >
              <LogOut size={14} />
              <span>خروج</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '26px' }}>
          <div style={{ background: '#fff', border: '1px solid #dce2d6', padding: '18px 20px', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#66756d', fontSize: '13px', fontWeight: 600 }}>
              <span>طلبات جديدة (تحتاج تواصل)</span>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#dc2626' }} />
            </div>
            <div style={{ fontSize: '30px', fontWeight: 800, color: '#dc2626', marginTop: '8px' }}>
              {newLeadsCount}
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #dce2d6', padding: '18px 20px', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#66756d', fontSize: '13px', fontWeight: 600 }}>
              <span>تم التواصل (قيد التنسيق)</span>
              <Clock size={16} style={{ color: '#d97706' }} />
            </div>
            <div style={{ fontSize: '30px', fontWeight: 800, color: '#d97706', marginTop: '8px' }}>
              {contactedCount}
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #dce2d6', padding: '18px 20px', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#66756d', fontSize: '13px', fontWeight: 600 }}>
              <span>طلبات مكتملة تم رشها</span>
              <CheckCircle2 size={16} style={{ color: '#54883a' }} />
            </div>
            <div style={{ fontSize: '30px', fontWeight: 800, color: '#54883a', marginTop: '8px' }}>
              {completedCount}
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #dce2d6', padding: '18px 20px', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#66756d', fontSize: '13px', fontWeight: 600 }}>
              <span>إجمالي الآراء والتقييمات</span>
              <Star size={16} style={{ color: '#eab308' }} />
            </div>
            <div style={{ fontSize: '30px', fontWeight: 800, color: '#17354a', marginTop: '8px' }}>
              {reviews.length} <span style={{ fontSize: '16px', color: '#66756d', fontWeight: 600 }}>({averageRating} ★)</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={() => setActiveTab('leads')}
            style={{
              padding: '11px 22px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              border: '1px solid',
              background: activeTab === 'leads' ? '#204733' : '#fff',
              color: activeTab === 'leads' ? '#fff' : '#45564e',
              borderColor: activeTab === 'leads' ? '#204733' : '#d5dfce',
              boxShadow: activeTab === 'leads' ? '0 4px 12px rgba(32,71,51,0.2)' : 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Users size={16} />
            <span>طلبات المعاينة وحجوزات الرش ({leads.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            style={{
              padding: '11px 22px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              border: '1px solid',
              background: activeTab === 'reviews' ? '#204733' : '#fff',
              color: activeTab === 'reviews' ? '#fff' : '#45564e',
              borderColor: activeTab === 'reviews' ? '#204733' : '#d5dfce',
              boxShadow: activeTab === 'reviews' ? '0 4px 12px rgba(32,71,51,0.2)' : 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <MessageSquare size={16} />
            <span>الآراء والتقييمات المعتمدة ({reviews.length})</span>
          </button>
        </div>

        {/* TAB 1: LEADS MANAGEMENT */}
        {activeTab === 'leads' && (
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #dce2d6', padding: '24px', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            {/* Search & Filter Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1 1 300px' }}>
                <div style={{ position: 'relative', width: '100%' }}>
                  <Search size={16} style={{ position: 'absolute', right: '12px', top: '12px', color: '#88968f' }} />
                  <input
                    type="text"
                    placeholder="ابحث بالاسم، رقم الهاتف، المحافظة أو نوع الخدمة..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 38px 10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #d1dad0',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <Filter size={15} style={{ color: '#687770' }} />
                <span style={{ fontSize: '13px', color: '#687770', fontWeight: 600 }}>الحالة:</span>
                {(['all', 'new', 'contacted', 'completed'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: '1px solid',
                      background: statusFilter === st ? '#eaf2e3' : '#f8faf6',
                      color: statusFilter === st ? '#204733' : '#687770',
                      borderColor: statusFilter === st ? '#8cb867' : '#dce3d5',
                    }}
                  >
                    {st === 'all' && 'الكل'}
                    {st === 'new' && 'جديدة'}
                    {st === 'contacted' && 'تم التواصل'}
                    {st === 'completed' && 'مكتملة'}
                  </button>
                ))}
              </div>
            </div>

            {/* Leads Table */}
            {filteredLeads.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '50px 20px', color: '#7a8982' }}>
                <Users size={40} style={{ opacity: 0.3, marginBottom: '10px' }} />
                <p style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>لا توجد طلبات تطابق بحثك حالياً</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ background: '#f5f7f2', borderBottom: '2px solid #e1e7dc', color: '#2a4838' }}>
                      <th style={{ padding: '12px 14px' }}>رقم الطلب</th>
                      <th style={{ padding: '12px 14px' }}>العميل والهاتف</th>
                      <th style={{ padding: '12px 14px' }}>المحافظة والمنطقة</th>
                      <th style={{ padding: '12px 14px' }}>الخدمة المطلوبة</th>
                      <th style={{ padding: '12px 14px' }}>ملاحظات العميل</th>
                      <th style={{ padding: '12px 14px' }}>وقت الطلب</th>
                      <th style={{ padding: '12px 14px' }}>الحالة</th>
                      <th style={{ padding: '12px 14px' }}>الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead) => {
                      const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
                      return (
                        <tr key={lead.id} style={{ borderBottom: '1px solid #edf0e7', transition: 'background 0.15s' }}>
                          <td style={{ padding: '14px', fontWeight: 700, color: '#17354a', direction: 'ltr', textAlign: 'right' }}>
                            #{lead.id}
                          </td>
                          <td style={{ padding: '14px' }}>
                            <strong style={{ display: 'block', color: '#17354a' }}>{lead.name}</strong>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                              <a
                                href={`tel:${cleanPhone}`}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  color: '#254a37',
                                  textDecoration: 'none',
                                  fontWeight: 600,
                                  fontSize: '12px',
                                  background: '#eef5e7',
                                  padding: '3px 8px',
                                  borderRadius: '4px',
                                }}
                              >
                                <PhoneCall size={12} />
                                <span style={{ direction: 'ltr' }}>{lead.phone}</span>
                              </a>
                              <a
                                href={`https://wa.me/965${cleanPhone}?text=${encodeURIComponent(`مرحباً أستاذ ${lead.name}، معك ديمو كلين لمكافحة الحشرات بخصوص طلبك (${lead.service}).`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  color: '#25D366',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '2px',
                                  fontSize: '12px',
                                  fontWeight: 600,
                                  textDecoration: 'none',
                                }}
                              >
                                <MessageCircle size={14} />
                                <span>واتساب</span>
                              </a>
                            </div>
                          </td>
                          <td style={{ padding: '14px', color: '#4d5d55' }}>
                            <span style={{ fontWeight: 600 }}>{lead.governorate}</span>
                          </td>
                          <td style={{ padding: '14px', color: '#204733', fontWeight: 600 }}>
                            {lead.service}
                          </td>
                          <td style={{ padding: '14px', color: '#687770', maxWidth: '220px', lineHeight: 1.6 }}>
                            {lead.notes || '—'}
                          </td>
                          <td style={{ padding: '14px', color: '#88968f', fontSize: '11.5px', whiteSpace: 'nowrap' }}>
                            {new Date(lead.createdAt).toLocaleDateString('ar-KW', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </td>
                          <td style={{ padding: '14px' }}>
                            <select
                              value={lead.status}
                              onChange={(e) => handleUpdateStatus(lead.id, e.target.value as LeadItem['status'])}
                              style={{
                                padding: '5px 8px',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: 600,
                                border: '1px solid #cad6c2',
                                background:
                                  lead.status === 'new'
                                    ? '#fee2e2'
                                    : lead.status === 'contacted'
                                    ? '#fef3c7'
                                    : '#dcfce7',
                                color:
                                  lead.status === 'new'
                                    ? '#991b1b'
                                    : lead.status === 'contacted'
                                    ? '#92400e'
                                    : '#166534',
                                cursor: 'pointer',
                              }}
                            >
                              <option value="new">جديد (لم يتم)</option>
                              <option value="contacted">تم التواصل</option>
                              <option value="completed">مكتمل الرش</option>
                              <option value="cancelled">ملغي</option>
                            </select>
                          </td>
                          <td style={{ padding: '14px' }}>
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              title="حذف الطلب"
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#dc2626',
                                cursor: 'pointer',
                                padding: '6px',
                                borderRadius: '4px',
                              }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: REVIEWS MANAGEMENT */}
        {activeTab === 'reviews' && (
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #dce2d6', padding: '24px', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            {/* Shareable Review Link Box */}
            <div
              style={{
                background: '#eef5ea',
                border: '1px solid #c9dec1',
                borderRadius: '10px',
                padding: '16px 20px',
                marginBottom: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div>
                <strong style={{ fontSize: '14px', color: '#1b3f2c', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🔗 رابط تقييم العملاء المباشر (أرسله للعميل بعد إنهاء العمل):</span>
                </strong>
                <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#4a6054' }}>
                  بدل ما تبعت رابط خرائط جوجل؛ يمكنك إرسال هذا الرابط للعميل لكتابة رأيه وتقييمه مباشرة في ثوانٍ.
                </p>
                <code
                  style={{
                    display: 'inline-block',
                    marginTop: '6px',
                    background: '#fff',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    color: '#204733',
                    border: '1px solid #d4e0cf',
                    direction: 'ltr',
                  }}
                >
                  https://democlean-kuwait.com/review
                </code>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => {
                    const fullUrl = `${window.location.origin}/review`;
                    navigator.clipboard.writeText(fullUrl);
                    setCopiedReviewLink(true);
                    setTimeout(() => setCopiedReviewLink(false), 2500);
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    background: copiedReviewLink ? '#15803d' : '#204733',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                >
                  <Check size={14} />
                  <span>{copiedReviewLink ? 'تم نسخ الرابط بنجاح ✓' : 'نسخ رابط التقييم'}</span>
                </button>
                <a
                  href="/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '8px 14px',
                    background: '#fff',
                    color: '#204733',
                    border: '1px solid #cad8bf',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  <span>فتح الصفحة</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Reviews Status Filter Tabs */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setReviewStatusFilter('all')}
                  style={{
                    padding: '7px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cad8bf',
                    background: reviewStatusFilter === 'all' ? '#204733' : '#fff',
                    color: reviewStatusFilter === 'all' ? '#fff' : '#45564e',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  الكل ({reviews.length})
                </button>
                <button
                  type="button"
                  onClick={() => setReviewStatusFilter('pending')}
                  style={{
                    padding: '7px 14px',
                    borderRadius: '8px',
                    border: '1px solid #fed7aa',
                    background: reviewStatusFilter === 'pending' ? '#ea580c' : '#fff7ed',
                    color: reviewStatusFilter === 'pending' ? '#fff' : '#c2410c',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>بانتظار التأكيد</span>
                  <span
                    style={{
                      background: reviewStatusFilter === 'pending' ? '#fff' : '#ea580c',
                      color: reviewStatusFilter === 'pending' ? '#ea580c' : '#fff',
                      fontSize: '10px',
                      padding: '1px 6px',
                      borderRadius: '10px',
                      fontWeight: 800,
                    }}
                  >
                    {reviews.filter((r) => r.status === 'pending').length}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setReviewStatusFilter('approved')}
                  style={{
                    padding: '7px 14px',
                    borderRadius: '8px',
                    border: '1px solid #bbf7d0',
                    background: reviewStatusFilter === 'approved' ? '#16a34a' : '#f0fdf4',
                    color: reviewStatusFilter === 'approved' ? '#fff' : '#15803d',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  المنشورة والمعتمدة ({reviews.filter((r) => r.status === 'approved' || (!r.status && r.verified)).length})
                </button>
                <button
                  type="button"
                  onClick={() => setReviewStatusFilter('rejected')}
                  style={{
                    padding: '7px 14px',
                    borderRadius: '8px',
                    border: '1px solid #fecaca',
                    background: reviewStatusFilter === 'rejected' ? '#dc2626' : '#fef2f2',
                    color: reviewStatusFilter === 'rejected' ? '#fff' : '#b91c1c',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  المرفوضة ({reviews.filter((r) => r.status === 'rejected').length})
                </button>
              </div>

              <button
                onClick={() => setShowAddReviewModal(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 18px',
                  background: '#204733',
                  color: '#fff',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                <Plus size={16} />
                <span>إضافة تقييم جديد (Google Maps / الموقع)</span>
              </button>
            </div>

            {/* Reviews Cards List */}
            {reviews
              .filter((rev) => {
                if (reviewStatusFilter === 'all') return true;
                if (reviewStatusFilter === 'pending') return rev.status === 'pending';
                if (reviewStatusFilter === 'approved') return rev.status === 'approved' || (!rev.status && rev.verified);
                if (reviewStatusFilter === 'rejected') return rev.status === 'rejected';
                return true;
              })
              .length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#7a8982', background: '#fafaf6', borderRadius: '10px' }}>
                لا توجد تقييمات في هذا التبويب حالياً.
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                {reviews
                  .filter((rev) => {
                    if (reviewStatusFilter === 'all') return true;
                    if (reviewStatusFilter === 'pending') return rev.status === 'pending';
                    if (reviewStatusFilter === 'approved') return rev.status === 'approved' || (!rev.status && rev.verified);
                    if (reviewStatusFilter === 'rejected') return rev.status === 'rejected';
                    return true;
                  })
                  .map((rev) => {
                    const isPending = rev.status === 'pending';
                    const isApproved = rev.status === 'approved' || (!rev.status && rev.verified);
                    const isRejected = rev.status === 'rejected';

                    return (
                      <div
                        key={rev.id}
                        style={{
                          background: isPending ? '#fffbf5' : '#fbfbf8',
                          border: isPending ? '1.5px solid #fed7aa' : '1px solid #e1e7dc',
                          padding: '20px',
                          borderRadius: '10px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '12px',
                          boxShadow: isPending ? '0 4px 14px rgba(234, 88, 12, 0.08)' : 'none',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                          <div>
                            <strong style={{ fontSize: '15px', color: '#17354a', display: 'block' }}>{rev.authorName}</strong>
                            <span style={{ fontSize: '11px', color: '#6d7b74' }}>
                              {rev.governorateName} · {rev.areaName}
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ color: '#eab308', fontSize: '13px', fontWeight: 700 }}>
                              {'★'.repeat(rev.rating)}
                            </span>
                            <button
                              onClick={() => handleDeleteReview(rev.id)}
                              style={{ background: 'transparent', border: 'none', color: '#dc2626', cursor: 'pointer', padding: '2px' }}
                              title="حذف التقييم"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <div style={{ fontSize: '11.5px', color: '#436b33', fontWeight: 700 }}>
                            الخدمة: {rev.serviceName}
                          </div>

                          {rev.source === 'google' ? (
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '10.5px',
                                color: '#1a73e8',
                                background: '#e8f0fe',
                                padding: '2px 7px',
                                borderRadius: '4px',
                                fontWeight: 700,
                              }}
                            >
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                              </svg>
                              <span>Google Maps</span>
                            </span>
                          ) : (
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px',
                                fontSize: '10.5px',
                                color: '#204733',
                                background: '#f0f5ee',
                                padding: '2px 7px',
                                borderRadius: '4px',
                                fontWeight: 600,
                              }}
                            >
                              <span>من الموقع</span>
                            </span>
                          )}

                          {/* Status Badge */}
                          {isPending && (
                            <span style={{ fontSize: '10.5px', background: '#ffedd5', color: '#c2410c', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>
                              ⏳ بانتظار التأكيد
                            </span>
                          )}
                          {isApproved && (
                            <span style={{ fontSize: '10.5px', background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                              ✓ منشور بالموقع
                            </span>
                          )}
                          {isRejected && (
                            <span style={{ fontSize: '10.5px', background: '#fee2e2', color: '#991b1b', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                              ✕ مرفوض
                            </span>
                          )}
                        </div>

                        <p style={{ margin: 0, fontSize: '13px', color: '#55655e', lineHeight: 1.8 }}>
                          "{rev.comment}"
                        </p>

                        {/* Action buttons for pending reviews */}
                        {isPending && (
                          <div style={{ display: 'flex', gap: '8px', paddingTop: '8px', borderTop: '1px dashed #fed7aa' }}>
                            <button
                              type="button"
                              onClick={() => handleUpdateReviewStatus(rev.id, 'approved')}
                              style={{
                                flex: 1,
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '5px',
                                padding: '8px',
                                background: '#16a34a',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: 700,
                                cursor: 'pointer',
                              }}
                            >
                              <Check size={14} />
                              <span>تأكيد ونشر بالموقع</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleUpdateReviewStatus(rev.id, 'rejected')}
                              style={{
                                padding: '8px 14px',
                                background: '#fee2e2',
                                color: '#dc2626',
                                border: '1px solid #fecaca',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: 600,
                                cursor: 'pointer',
                              }}
                            >
                              رفض
                            </button>
                          </div>
                        )}

                        {/* Toggle button if already approved/rejected */}
                        {!isPending && (
                          <div style={{ marginTop: 'auto', paddingTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#8d9c92', borderTop: '1px dashed #e1e5dc' }}>
                            <span>تاريخ التقييم: {rev.date}</span>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              {isApproved ? (
                                <button
                                  type="button"
                                  onClick={() => handleUpdateReviewStatus(rev.id, 'rejected')}
                                  style={{ background: 'transparent', border: 'none', color: '#dc2626', fontSize: '11px', cursor: 'pointer', textDecoration: 'underline' }}
                                >
                                  إلغاء النشر
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleUpdateReviewStatus(rev.id, 'approved')}
                                  style={{ background: 'transparent', border: 'none', color: '#16a34a', fontSize: '11px', cursor: 'pointer', textDecoration: 'underline', fontWeight: 700 }}
                                >
                                  إعادة نشر
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}

        {/* Modal: Add New Review */}
        {showAddReviewModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.5)',
              display: 'grid',
              placeItems: 'center',
              zIndex: 9999,
              padding: '20px',
            }}
          >
            <div
              style={{
                background: '#fff',
                width: '100%',
                maxWidth: '500px',
                borderRadius: '14px',
                padding: '24px',
                border: '1px solid #dce2d6',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#17354a' }}>
                  إضافة تقييم عميل جديد
                </h3>
                <button
                  onClick={() => setShowAddReviewModal(false)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#687770' }}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddReview} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ background: '#f5f7f3', padding: '12px', borderRadius: '8px', border: '1px solid #d8e2d4' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#204733', marginBottom: '6px' }}>
                    مصدر التقييم (من أين جاء؟):
                  </label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <label
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: newReview.source === 'google' ? '2px solid #1a73e8' : '1px solid #ccd8c7',
                        background: newReview.source === 'google' ? '#e8f0fe' : '#fff',
                        cursor: 'pointer',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        color: newReview.source === 'google' ? '#1967d2' : '#45564e',
                      }}
                    >
                      <input
                        type="radio"
                        name="reviewSource"
                        value="google"
                        checked={newReview.source === 'google'}
                        onChange={() => setNewReview({ ...newReview, source: 'google' })}
                        style={{ display: 'none' }}
                      />
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <span>Google Maps (سحب من الخرائط)</span>
                    </label>

                    <label
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: newReview.source === 'website' ? '2px solid #204733' : '1px solid #ccd8c7',
                        background: newReview.source === 'website' ? '#edf5ea' : '#fff',
                        cursor: 'pointer',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        color: newReview.source === 'website' ? '#204733' : '#45564e',
                      }}
                    >
                      <input
                        type="radio"
                        name="reviewSource"
                        value="website"
                        checked={newReview.source === 'website'}
                        onChange={() => setNewReview({ ...newReview, source: 'website' })}
                        style={{ display: 'none' }}
                      />
                      <span>موقع الشركة (رابط مباشر)</span>
                    </label>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#45564e', marginBottom: '6px' }}>
                      اسم العميل أو المعرّف:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: م. فهد الشمري"
                      value={newReview.authorName}
                      onChange={(e) => setNewReview({ ...newReview, authorName: e.target.value })}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1dad0', fontSize: '13px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#45564e', marginBottom: '6px' }}>
                      تاريخ التقييم:
                    </label>
                    <input
                      type="date"
                      value={newReview.date}
                      onChange={(e) => setNewReview({ ...newReview, date: e.target.value })}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1dad0', fontSize: '13px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#45564e', marginBottom: '6px' }}>
                      المحافظة:
                    </label>
                    <input
                      type="text"
                      placeholder="العاصمة / حولي..."
                      value={newReview.governorateName}
                      onChange={(e) => setNewReview({ ...newReview, governorateName: e.target.value })}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1dad0', fontSize: '13px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#45564e', marginBottom: '6px' }}>
                      المنطقة:
                    </label>
                    <input
                      type="text"
                      placeholder="الروضة / السالمية..."
                      value={newReview.areaName}
                      onChange={(e) => setNewReview({ ...newReview, areaName: e.target.value })}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1dad0', fontSize: '13px' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#45564e', marginBottom: '6px' }}>
                    نوع الخدمة:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: مكافحة الصراصير بالجل الألماني"
                    value={newReview.serviceName}
                    onChange={(e) => setNewReview({ ...newReview, serviceName: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1dad0', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#45564e', marginBottom: '6px' }}>
                    التقييم (النجوم):
                  </label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1dad0', fontSize: '13px' }}
                  >
                    <option value={5}>5 نجوم (ممتاز)</option>
                    <option value={4}>4 نجوم (جيد جداً)</option>
                    <option value={3}>3 نجوم</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#45564e', marginBottom: '6px' }}>
                    نص رأي العميل:
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="اكتب تجربة العميل ورأيه بالخدمة..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1dad0', fontSize: '13px', resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      padding: '11px',
                      background: '#204733',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    حفظ ونشر التقييم
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddReviewModal(false)}
                    style={{
                      padding: '11px 18px',
                      background: '#f1f5ec',
                      border: '1px solid #cad8bf',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#495b51',
                      cursor: 'pointer',
                    }}
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
