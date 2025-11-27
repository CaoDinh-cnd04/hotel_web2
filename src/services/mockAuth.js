// Mock authentication service for development
export const mockAuthAPI = {
  login: async (credentials) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock validation
    if (!credentials.email || !credentials.mat_khau) {
      throw new Error('Email và mật khẩu không được để trống')
    }
    
    // Mock successful login
    const mockUser = {
      id: 1,
      ho_ten: 'Người dùng test',
      email: credentials.email,
      so_dien_thoai: '0123456789',
      gioi_tinh: 'Nam',
      ngay_sinh: '1990-05-15',
      chuc_vu: 'User',
      avatar: null,
      created_at: '2024-01-01T00:00:00.000Z'
    }
    
    return {
      data: {
        user: mockUser,
        token: 'mock-jwt-token-' + Date.now()
      }
    }
  },

  register: async (userData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock validation
    if (!userData.ho_ten || !userData.email || !userData.mat_khau) {
      throw new Error('Vui lòng điền đầy đủ thông tin')
    }
    
    if (userData.mat_khau.length < 6) {
      throw new Error('Mật khẩu phải có ít nhất 6 ký tự')
    }
    
    // Check for duplicate email (mock)
    if (userData.email === 'test@test.com') {
      throw new Error('Email này đã được sử dụng')
    }
    
    // Mock successful registration
    const mockUser = {
      id: Date.now(),
      ho_ten: userData.ho_ten,
      email: userData.email,
      so_dien_thoai: userData.so_dien_thoai || '',
      gioi_tinh: userData.gioi_tinh || 'Nam',
      chuc_vu: userData.chuc_vu || 'User',
      avatar: null,
      created_at: new Date().toISOString()
    }
    
    return {
      data: {
        user: mockUser,
        token: 'mock-jwt-token-' + Date.now()
      }
    }
  },

  logout: async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return { data: { message: 'Đăng xuất thành công' } }
  }
}