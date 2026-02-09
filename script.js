
        // Sample book data with real book cover images
        const initialBooks = [
            {
                id: 1,
                title: "The Midnight Library",
                author: "Matt Haig",
                category: "Fiction",
                isbn: "9780525559474",
                image: "img/img1.jpg",
                status: "available",
                rating: 4.2,
                borrowHistory: []
            },
            {
                id: 2,
                title: "Atomic Habits",
                author: "James Clear",
                category: "Non-Fiction",
                isbn: "9780735211292",
                image: "img/img2.jpg",
                status: "borrowed",
                rating: 4.8,
                borrowHistory: [
                    {
                        borrower: "Alex Johnson",
                        borrowDate: "2023-06-15",
                        returnDate: "2023-07-15",
                        status: "returned"
                    },
                    {
                        borrower: "Sarah Williams",
                        borrowDate: "2023-08-20",
                        returnDate: null,
                        status: "borrowed"
                    }
                ]
            },
            {
                id: 3,
                title: "Project Hail Mary",
                author: "Andy Weir",
                category: "Science",
                isbn: "9780593135204",
                image: "https://images.unsplash.com/photo-1531346688376-ab6275c4725e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                status: "available",
                rating: 4.7,
                borrowHistory: []
            },
            {
                id: 4,
                title: "Educated",
                author: "Tara Westover",
                category: "Biography",
                isbn: "9780399590504",
                image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                status: "available",
                rating: 4.5,
                borrowHistory: []
            },
            {
                id: 5,
                title: "Sapiens: A Brief History of Humankind",
                author: "Yuval Noah Harari",
                category: "History",
                isbn: "9780062316097",
                image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                status: "borrowed",
                rating: 4.6,
                borrowHistory: [
                    {
                        borrower: "Michael Chen",
                        borrowDate: "2023-09-10",
                        returnDate: null,
                        status: "borrowed"
                    }
                ]
            },
            {
                id: 6,
                title: "The Hobbit",
                author: "J.R.R. Tolkien",
                category: "Fantasy",
                isbn: "9780547928227",
                image: "https://images.unsplash.com/photo-1531346688376-ab6275c4725e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                status: "available",
                rating: 4.9,
                borrowHistory: []
            },
            {
                id: 7,
                title: "The Silent Patient",
                author: "Alex Michaelides",
                category: "Mystery",
                isbn: "9781250301697",
                image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                status: "available",
                rating: 4.3,
                borrowHistory: []
            },
            {
                id: 8,
                title: "Clean Code",
                author: "Robert C. Martin",
                category: "Technology",
                isbn: "9780132350884",
                image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                status: "borrowed",
                rating: 4.7,
                borrowHistory: [
                    {
                        borrower: "David Miller",
                        borrowDate: "2023-09-01",
                        returnDate: null,
                        status: "borrowed"
                    }
                ]
            },
            {
                id: 9,
                title: "Meditations",
                author: "Marcus Aurelius",
                category: "Philosophy",
                isbn: "9780140449334",
                image: "https://images.unsplash.com/photo-1531346688376-ab6275c4725e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                status: "available",
                rating: 4.4,
                borrowHistory: []
            },
            {
                id: 10,
                title: "The Complete Poems",
                author: "Emily Dickinson",
                category: "Poetry",
                isbn: "9780571192181",
                image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                status: "available",
                rating: 4.5,
                borrowHistory: []
            }
        ];

        // Initialize app
        let books = JSON.parse(localStorage.getItem('bibliothecaBooks')) || initialBooks;
        let currentBookToBorrow = null;

        // DOM Elements
        const themeToggle = document.getElementById('theme-toggle');
        const searchInput = document.getElementById('search-input');
        const categoryList = document.getElementById('category-list');
        const booksGrid = document.getElementById('books-grid');
        const availableBooksGrid = document.getElementById('available-books-grid');
        const borrowedBooksGrid = document.getElementById('borrowed-books-grid');
        const tabs = document.querySelectorAll('.tab');
        const tabContents = document.querySelectorAll('.tab-content');
        const addBookBtn = document.getElementById('add-book-btn');
        const viewHistoryBtn = document.getElementById('view-history-btn');
        const addBookModal = document.getElementById('add-book-modal');
        const borrowModal = document.getElementById('borrow-modal');
        const closeModalBtns = document.querySelectorAll('.close-modal');
        const addBookForm = document.getElementById('add-book-form');
        const borrowForm = document.getElementById('borrow-form');
        const historyTableBody = document.getElementById('history-table-body');

        // Theme Toggle
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('bibliothecaTheme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('bibliothecaTheme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }

        // Initialize
        function init() {
            updateStats();
            renderCategories();
            renderAllBooks();
            renderAvailableBooks();
            renderBorrowedBooks();
            renderBorrowingHistory();
            setupEventListeners();
            
            if (!localStorage.getItem('bibliothecaBooks')) {
                localStorage.setItem('bibliothecaBooks', JSON.stringify(books));
            }
            
            // Set default dates
            const today = new Date().toISOString().split('T')[0];
            const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            document.getElementById('borrow-date').value = today;
            document.getElementById('borrow-date').min = today;
            document.getElementById('expected-return').value = nextWeek;
            document.getElementById('expected-return').min = today;
        }

        // Update statistics
        function updateStats() {
            const totalBooks = books.length;
            const availableBooks = books.filter(book => book.status === 'available').length;
            const borrowedBooks = books.filter(book => book.status === 'borrowed').length;
            const categories = [...new Set(books.map(book => book.category))];
            
            document.getElementById('total-books').textContent = totalBooks;
            document.getElementById('available-books').textContent = availableBooks;
            document.getElementById('borrowed-books').textContent = borrowedBooks;
            document.getElementById('categories-count').textContent = categories.length;
        }

        // Render categories
        function renderCategories() {
            const categories = [...new Set(books.map(book => book.category))];
            categoryList.innerHTML = '';
            
            // All categories
            const allItem = document.createElement('li');
            allItem.className = 'category-item active';
            allItem.innerHTML = `
                All Categories
                <span class="category-count">${books.length}</span>
            `;
            allItem.addEventListener('click', () => {
                document.querySelectorAll('.category-item').forEach(item => item.classList.remove('active'));
                allItem.classList.add('active');
                filterBooksByCategory('all');
            });
            categoryList.appendChild(allItem);
            
            // Individual categories
            categories.forEach(category => {
                const count = books.filter(book => book.category === category).length;
                const item = document.createElement('li');
                item.className = 'category-item';
                item.innerHTML = `
                    ${category}
                    <span class="category-count">${count}</span>
                `;
                item.addEventListener('click', () => {
                    document.querySelectorAll('.category-item').forEach(item => item.classList.remove('active'));
                    item.classList.add('active');
                    filterBooksByCategory(category);
                });
                categoryList.appendChild(item);
            });
        }

        // Filter books by category
        function filterBooksByCategory(category) {
            if (category === 'all') {
                renderAllBooks();
                renderAvailableBooks();
                renderBorrowedBooks();
            } else {
                const filteredBooks = books.filter(book => book.category === category);
                renderBooksToGrid(filteredBooks, booksGrid);
                
                const filteredAvailable = filteredBooks.filter(book => book.status === 'available');
                renderBooksToGrid(filteredAvailable, availableBooksGrid);
                
                const filteredBorrowed = filteredBooks.filter(book => book.status === 'borrowed');
                renderBooksToGrid(filteredBorrowed, borrowedBooksGrid);
            }
        }

        // Render all books
        function renderAllBooks() {
            renderBooksToGrid(books, booksGrid);
        }

        // Render available books
        function renderAvailableBooks() {
            const availableBooks = books.filter(book => book.status === 'available');
            renderBooksToGrid(availableBooks, availableBooksGrid);
        }

        // Render borrowed books
        function renderBorrowedBooks() {
            const borrowedBooks = books.filter(book => book.status === 'borrowed');
            renderBooksToGrid(borrowedBooks, borrowedBooksGrid);
        }

        // Render books to grid
        function renderBooksToGrid(booksArray, gridElement) {
            gridElement.innerHTML = '';
            
            if (booksArray.length === 0) {
                gridElement.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-book-open"></i>
                        <h3>No books found</h3>
                        <p>Try a different search or add new books to your library</p>
                    </div>
                `;
                return;
            }
            
            booksArray.forEach(book => {
                const currentBorrow = book.borrowHistory.find(record => record.status === 'borrowed');
                const ratingStars = getRatingStars(book.rating);
                
                const bookCard = document.createElement('div');
                bookCard.className = 'book-card';
                bookCard.innerHTML = `
                    <div class="book-cover">
                        <img src="${book.image}" alt="${book.title}">
                        <div class="book-cover-overlay">
                            <span class="book-category-tag">${book.category}</span>
                        </div>
                    </div>
                    <div class="book-info">
                        <h3 class="book-title">${book.title}</h3>
                        <p class="book-author">${book.author}</p>
                        <div class="book-meta">
                            <div class="rating">
                                ${ratingStars}
                                <span style="margin-left: 6px;">${book.rating}</span>
                            </div>
                            <span>${book.isbn}</span>
                        </div>
                        <div class="book-status">
                            <span class="status-badge ${book.status === 'available' ? 'status-available' : 'status-borrowed'}">
                                ${book.status === 'available' ? 'Available' : 'Borrowed'}
                            </span>
                            ${book.status === 'available' ? 
                                `<button class="action-btn borrow-btn" data-id="${book.id}">Borrow</button>` : 
                                `<button class="action-btn return-btn" data-id="${book.id}">Return</button>`
                            }
                        </div>
                    </div>
                `;
                
                gridElement.appendChild(bookCard);
            });
            
            // Add event listeners to buttons
            gridElement.querySelectorAll('.borrow-btn, .return-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const bookId = parseInt(this.getAttribute('data-id'));
                    const book = books.find(b => b.id === bookId);
                    
                    if (book.status === 'available') {
                        currentBookToBorrow = bookId;
                        borrowModal.style.display = 'flex';
                    } else {
                        returnBook(bookId);
                    }
                });
            });
        }

        // Get rating stars HTML
        function getRatingStars(rating) {
            let stars = '';
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 >= 0.5;
            
            for (let i = 1; i <= 5; i++) {
                if (i <= fullStars) {
                    stars += '<i class="fas fa-star"></i>';
                } else if (i === fullStars + 1 && hasHalfStar) {
                    stars += '<i class="fas fa-star-half-alt"></i>';
                } else {
                    stars += '<i class="far fa-star"></i>';
                }
            }
            return stars;
        }

        // Render borrowing history
        function renderBorrowingHistory() {
            let allHistory = [];
            books.forEach(book => {
                book.borrowHistory.forEach(record => {
                    allHistory.push({
                        bookTitle: book.title,
                        bookAuthor: book.author,
                        ...record
                    });
                });
            });
            
            allHistory.sort((a, b) => new Date(b.borrowDate) - new Date(a.borrowDate));
            
            historyTableBody.innerHTML = '';
            
            if (allHistory.length === 0) {
                historyTableBody.innerHTML = `
                    <tr>
                        <td colspan="5" style="text-align: center; padding: 60px; color: var(--light-text-secondary);">
                            <i class="fas fa-history" style="font-size: 2.5rem; margin-bottom: 16px; display: block; opacity: 0.5;"></i>
                            <p>No borrowing history yet</p>
                        </td>
                    </tr>
                `;
                return;
            }
            
            allHistory.forEach(record => {
                const row = document.createElement('tr');
                const borrowDate = new Date(record.borrowDate).toLocaleDateString();
                const returnDate = record.returnDate ? 
                    new Date(record.returnDate).toLocaleDateString() : 
                    'Not returned';
                
                row.innerHTML = `
                    <td>
                        <strong>${record.bookTitle}</strong><br>
                        <small>${record.bookAuthor}</small>
                    </td>
                    <td>${record.borrower}</td>
                    <td>${borrowDate}</td>
                    <td>${returnDate}</td>
                    <td>
                        <span class="status-badge ${record.status === 'returned' ? 'status-available' : 'status-borrowed'}">
                            ${record.status === 'returned' ? 'Returned' : 'Borrowed'}
                        </span>
                    </td>
                `;
                
                historyTableBody.appendChild(row);
            });
        }

        // Search books
        function searchBooks() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            if (!searchTerm) {
                renderAllBooks();
                renderAvailableBooks();
                renderBorrowedBooks();
                return;
            }
            
            const filteredBooks = books.filter(book => 
                book.title.toLowerCase().includes(searchTerm) ||
                book.author.toLowerCase().includes(searchTerm) ||
                book.category.toLowerCase().includes(searchTerm) ||
                (book.isbn && book.isbn.includes(searchTerm))
            );
            
            renderBooksToGrid(filteredBooks, booksGrid);
            renderBooksToGrid(filteredBooks.filter(b => b.status === 'available'), availableBooksGrid);
            renderBooksToGrid(filteredBooks.filter(b => b.status === 'borrowed'), borrowedBooksGrid);
        }

        // Add book
        function addBook(title, author, category, isbn, imageUrl) {
            const defaultImages = [
                "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1531346688376-ab6275c4725e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ];
            
            const randomDefaultImage = defaultImages[Math.floor(Math.random() * defaultImages.length)];
            
            const newBook = {
                id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
                title,
                author,
                category,
                isbn: isbn || '',
                image: imageUrl || randomDefaultImage,
                rating: (Math.random() * 1 + 4).toFixed(1), // Random rating between 4.0 and 5.0
                status: 'available',
                borrowHistory: []
            };
            
            books.push(newBook);
            localStorage.setItem('bibliothecaBooks', JSON.stringify(books));
            
            updateStats();
            renderCategories();
            renderAllBooks();
            renderAvailableBooks();
            renderBorrowedBooks();
            
            // Show success notification
            showNotification(`"${title}" has been added to your library!`, 'success');
        }

        // Borrow book
        function borrowBook(bookId, borrowerName, borrowDate, expectedReturn) {
            const book = books.find(b => b.id === bookId);
            
            if (!book) return;
            
            book.status = 'borrowed';
            book.borrowHistory.push({
                borrower: borrowerName,
                borrowDate,
                returnDate: null,
                expectedReturn,
                status: 'borrowed'
            });
            
            localStorage.setItem('bibliothecaBooks', JSON.stringify(books));
            
            updateStats();
            renderAllBooks();
            renderAvailableBooks();
            renderBorrowedBooks();
            renderBorrowingHistory();
            
            showNotification(`"${book.title}" has been borrowed by ${borrowerName}`, 'success');
        }

        // Return book
        function returnBook(bookId) {
            const book = books.find(b => b.id === bookId);
            
            if (!book) return;
            
            book.status = 'available';
            const currentBorrow = book.borrowHistory.find(record => record.status === 'borrowed');
            if (currentBorrow) {
                currentBorrow.status = 'returned';
                currentBorrow.returnDate = new Date().toISOString().split('T')[0];
            }
            
            localStorage.setItem('bibliothecaBooks', JSON.stringify(books));
            
            updateStats();
            renderAllBooks();
            renderAvailableBooks();
            renderBorrowedBooks();
            renderBorrowingHistory();
            
            showNotification(`"${book.title}" has been returned`, 'success');
        }

        // Show notification
        function showNotification(message, type) {
            // Create notification element
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 16px 24px;
                background: ${type === 'success' ? '#28a745' : '#dc3545'};
                color: white;
                border-radius: 12px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                z-index: 1001;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 10px;
            `;
            
            notification.innerHTML = `
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                ${message}
            `;
            
            document.body.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 10);
            
            // Remove after 3 seconds
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        }

        // Setup event listeners
        function setupEventListeners() {
            // Search
            searchInput.addEventListener('input', searchBooks);
            
            // Tabs
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    tabs.forEach(t => t.classList.remove('active'));
                    tabContents.forEach(content => content.classList.remove('active'));
                    tab.classList.add('active');
                    document.getElementById(tab.dataset.tab).classList.add('active');
                });
            });
            
            // Modals
            addBookBtn.addEventListener('click', () => {
                addBookModal.style.display = 'flex';
            });
            
            viewHistoryBtn.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Create history tab if doesn't exist
                let historyTab = document.querySelector('[data-tab="borrowing-history"]');
                if (!historyTab) {
                    historyTab = document.createElement('div');
                    historyTab.className = 'tab';
                    historyTab.dataset.tab = 'borrowing-history';
                    historyTab.textContent = 'History';
                    document.querySelector('.tabs').appendChild(historyTab);
                    
                    historyTab.addEventListener('click', () => {
                        tabs.forEach(t => t.classList.remove('active'));
                        tabContents.forEach(content => content.classList.remove('active'));
                        historyTab.classList.add('active');
                        document.getElementById('borrowing-history').classList.add('active');
                    });
                }
                
                historyTab.classList.add('active');
                document.getElementById('borrowing-history').classList.add('active');
            });
            
            // Close modals
            closeModalBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    this.closest('.modal').style.display = 'none';
                });
            });
            
            // Close on backdrop click
            window.addEventListener('click', (e) => {
                if (e.target.classList.contains('modal')) {
                    e.target.style.display = 'none';
                }
            });
            
            // Forms
            addBookForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const title = document.getElementById('book-title').value;
                const author = document.getElementById('book-author').value;
                const category = document.getElementById('book-category').value;
                const isbn = document.getElementById('book-isbn').value;
                const imageUrl = document.getElementById('book-image').value;
                
                addBook(title, author, category, isbn, imageUrl);
                addBookForm.reset();
                addBookModal.style.display = 'none';
            });
            
            borrowForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const borrowerName = document.getElementById('borrower-name').value;
                const borrowDate = document.getElementById('borrow-date').value;
                const expectedReturn = document.getElementById('expected-return').value;
                
                borrowBook(currentBookToBorrow, borrowerName, borrowDate, expectedReturn);
                borrowForm.reset();
                
                // Reset dates
                const today = new Date().toISOString().split('T')[0];
                const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                document.getElementById('borrow-date').value = today;
                document.getElementById('expected-return').value = nextWeek;
                
                borrowModal.style.display = 'none';
                currentBookToBorrow = null;
            });
        }

        // Initialize the app
        init();