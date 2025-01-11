const { 
    Button, AppBar, Toolbar, Typography, Container, Grid, Card, CardContent,
    TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions,
    Snackbar, Alert, Box, Chip
  } = MaterialUI;
  
  const App = () => {
    const [page, setPage] = React.useState('home');
    const [searchQuery, setSearchQuery] = React.useState('');
    const [searchResults, setSearchResults] = React.useState({ users: [], books: [] });
    const [showSearchResults, setShowSearchResults] = React.useState(false);
  
    const [users, setUsers] = React.useState([
      { id: 1, name: 'John Doe', email: 'john@example.com', fineAmount: 0 },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', fineAmount: 5 },
      { id: 3, name: 'Alice Johnson', email: 'alice@example.com', fineAmount: 10 },
      { id: 4, name: 'Bob Wilson', email: 'bob@example.com', fineAmount: 0 },
      { id: 5, name: 'Carol Brown', email: 'carol@example.com', fineAmount: 15 },
      { id: 6, name: 'David Lee', email: 'david@example.com', fineAmount: 0 },
      { id: 7, name: 'Eva Garcia', email: 'eva@example.com', fineAmount: 8 },
      { id: 8, name: 'Frank Miller', email: 'frank@example.com', fineAmount: 0 },
      { id: 9, name: 'Grace Taylor', email: 'grace@example.com', fineAmount: 12 },
      { id: 10, name: 'Henry Davis', email: 'henry@example.com', fineAmount: 0 }
    ]);
  
    const [books, setBooks] = React.useState([
      { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', rackLocation: 'A1', isAvailable: true },
      { id: 2, title: '1984', author: 'George Orwell', genre: 'Science Fiction', rackLocation: 'A2', isAvailable: false },
      { id: 3, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', rackLocation: 'B1', isAvailable: true },
      { id: 4, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Classic', rackLocation: 'A3', isAvailable: true },
      { id: 5, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', rackLocation: 'C1', isAvailable: false },
      { id: 6, title: 'Harry Potter', author: 'J.K. Rowling', genre: 'Fantasy', rackLocation: 'C2', isAvailable: true },
      { id: 7, title: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'Classic', rackLocation: 'A4', isAvailable: true },
      { id: 8, title: 'Lord of the Flies', author: 'William Golding', genre: 'Classic', rackLocation: 'A5', isAvailable: true },
      { id: 9, title: 'The Da Vinci Code', author: 'Dan Brown', genre: 'Mystery', rackLocation: 'D1', isAvailable: false },
      { id: 10, title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Fiction', rackLocation: 'E1', isAvailable: true }
    ]);
  
    const [reservations, setReservations] = React.useState([
      { id: 1, userId: 1, bookId: 2, date: '2025-01-11', returnDate: '2025-01-25', status: 'active' },
      { id: 2, userId: 3, bookId: 5, date: '2025-01-10', returnDate: '2025-01-24', status: 'active' },
      { id: 3, userId: 7, bookId: 9, date: '2025-01-09', returnDate: '2025-01-23', status: 'active' },
      { id: 4, userId: 2, bookId: 1, date: '2025-01-01', returnDate: '2025-01-15', status: 'returned' },
      { id: 5, userId: 4, bookId: 3, date: '2025-01-02', returnDate: '2025-01-16', status: 'returned' },
      { id: 6, userId: 5, bookId: 6, date: '2025-01-03', returnDate: '2025-01-17', status: 'returned' },
      { id: 7, userId: 6, bookId: 7, date: '2025-01-04', returnDate: '2025-01-18', status: 'returned' },
      { id: 8, userId: 8, bookId: 8, date: '2025-01-05', returnDate: '2025-01-19', status: 'returned' },
      { id: 9, userId: 9, bookId: 4, date: '2025-01-06', returnDate: '2025-01-20', status: 'returned' },
      { id: 10, userId: 10, bookId: 10, date: '2025-01-07', returnDate: '2025-01-21', status: 'returned' }
    ]);
  
    const handleSearch = (query) => {
      setSearchQuery(query);
      
      if (query.trim() === '') {
        setShowSearchResults(false);
        return;
      }
  
      const searchTerm = query.toLowerCase().trim();
      
      // Search users
      const matchedUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
      );
  
      // Search books
      const matchedBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.genre.toLowerCase().includes(searchTerm) ||
        book.rackLocation.toLowerCase().includes(searchTerm)
      );
  
      setSearchResults({ 
        users: matchedUsers.slice(0, 10), // Limit to top 10 results
        books: matchedBooks.slice(0, 10)  // Limit to top 10 results
      });
      setShowSearchResults(true);
    };
  
    const Header = () => (
      <AppBar position="static" sx={{ background: 'rgba(25, 118, 210, 0.95)' }}>
        <Toolbar>
          <span 
            className="material-icons home-icon" 
            onClick={() => {
              setPage('home');
              setShowSearchResults(false);
              setSearchQuery('');
            }}
            style={{ fontSize: '28px' }}
          >
            home
          </span>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#ffffff' }}>
            Library Management System
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              className="search-bar"
              placeholder="Search books or users..."
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <span className="material-icons" style={{ marginRight: 8 }}>search</span>
                ),
              }}
              sx={{ 
                mr: 2, 
                width: 300,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '25px',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                  },
                }
              }}
            />
            {searchQuery && (
              <IconButton 
                size="small" 
                onClick={() => {
                  setSearchQuery('');
                  setShowSearchResults(false);
                }}
                sx={{ color: 'white', mr: 1 }}
              >
                <span className="material-icons">clear</span>
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    );
  
    const QuickLinks = () => (
      <Box sx={{ py: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setPage('users')}
          startIcon={<span className="material-icons">people</span>}
        >
          Users
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setPage('books')}
          startIcon={<span className="material-icons">book</span>}
        >
          Books
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setPage('reservations')}
          startIcon={<span className="material-icons">bookmark</span>}
        >
          Reservations
        </Button>
      </Box>
    );
  
    const Footer = () => (
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: 'rgba(25, 118, 210, 0.95)',
          color: 'white',
          position: 'fixed',
          bottom: 0,
          width: '100%',
          zIndex: 2
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body1" align="center">
            2024 Library Management System. All rights reserved.
          </Typography>
        </Container>
      </Box>
    );
  
    const [viewItem, setViewItem] = React.useState(null);
    const [isViewDialogOpen, setIsViewDialogOpen] = React.useState(false);
  
    const handleView = (item) => {
      setViewItem(item);
      setIsViewDialogOpen(true);
    };
  
    const handleDelete = (itemId, itemType) => {
      if (itemType === 'user') {
        setUsers(users.filter(user => user.id !== itemId));
      } else if (itemType === 'book') {
        setBooks(books.filter(book => book.id !== itemId));
      }
    };
  
    const UserCard = ({ user }) => (
      <Card sx={{ mb: 2, background: 'rgba(255, 255, 255, 0.9)' }}>
        <CardContent>
          <Typography variant="h6">{user.name}</Typography>
          <Typography color="textSecondary">{user.email}</Typography>
          <Box sx={{ mt: 2 }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="small" 
              onClick={() => handleEdit(user)}
              sx={{ mr: 1 }}
            >
              Edit
            </Button>
            <Button 
              variant="outlined" 
              color="primary" 
              size="small"
              onClick={() => handleView(user)}
              sx={{ mr: 1 }}
            >
              View Details
            </Button>
            <Button 
              variant="outlined" 
              color="error" 
              size="small"
              onClick={() => handleDelete(user.id, 'user')}
            >
              Delete
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  
    const BookCard = ({ book }) => (
      <Card sx={{ mb: 2, background: 'rgba(255, 255, 255, 0.9)' }}>
        <CardContent>
          <Typography variant="h6">{book.title}</Typography>
          <Typography color="textSecondary">By {book.author}</Typography>
          <Typography color="textSecondary">Genre: {book.genre}</Typography>
          <Box sx={{ mt: 2 }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="small" 
              onClick={() => handleEdit(book)}
              sx={{ mr: 1 }}
            >
              Edit
            </Button>
            <Button 
              variant="outlined" 
              color="primary" 
              size="small"
              onClick={() => handleView(book)}
              sx={{ mr: 1 }}
            >
              View Details
            </Button>
            <Button 
              variant="outlined" 
              color="error" 
              size="small"
              onClick={() => handleDelete(book.id, 'book')}
            >
              Delete
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  
    const [editItem, setEditItem] = React.useState(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  
    const handleEdit = (item) => {
      setEditItem(item);
      setIsEditDialogOpen(true);
    };
  
    const handleEditSubmit = () => {
      if (editItem) {
        const updatedItems = users.map(item => 
          item.id === editItem.id ? editItem : item
        );
        setUsers(updatedItems);
        setIsEditDialogOpen(false);
        setEditItem(null);
      }
    };
  
    const HomePage = () => (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Card sx={{ 
              background: 'rgba(255, 255, 255, 0.9) !important',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Users
                </Typography>
                <Typography variant="h4" sx={{ color: '#1976d2' }}>
                  {users.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ 
              background: 'rgba(255, 255, 255, 0.9) !important',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Books
                </Typography>
                <Typography variant="h4" sx={{ color: '#1976d2' }}>
                  {books.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ 
              background: 'rgba(255, 255, 255, 0.9) !important',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Active Reservations
                </Typography>
                <Typography variant="h4" sx={{ color: '#1976d2' }}>
                  {reservations.filter(r => r.status === 'active').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ 
              background: 'rgba(255, 255, 255, 0.9) !important',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Available Books
                </Typography>
                <Typography variant="h4" sx={{ color: '#1976d2' }}>
                  {books.filter(b => b.isAvailable).length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  
    const UsersPage = () => (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper className="page-content">
          <Typography variant="h4" sx={{ mb: 4 }}>Users</Typography>
          <Grid container spacing={2}>
            {users.map(user => (
              <Grid item key={user.id} xs={12} md={4}>
                <UserCard user={user} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    );
  
    const BooksPage = () => (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper className="page-content">
          <Typography variant="h4" sx={{ mb: 4 }}>Books</Typography>
          <Grid container spacing={2}>
            {books.map(book => (
              <Grid item key={book.id} xs={12} md={4}>
                <BookCard book={book} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    );
  
    const ReservationsPage = () => (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper className="page-content">
          <Typography variant="h4" sx={{ mb: 4 }}>Reservations</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Book</TableCell>
                  <TableCell>Reservation Date</TableCell>
                  <TableCell>Return Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reservations.map((reservation) => {
                  const user = users.find(u => u.id === reservation.userId);
                  const book = books.find(b => b.id === reservation.bookId);
                  return (
                    <TableRow key={reservation.id}>
                      <TableCell>{user?.name}</TableCell>
                      <TableCell>{book?.title}</TableCell>
                      <TableCell>{reservation.date}</TableCell>
                      <TableCell>{reservation.returnDate}</TableCell>
                      <TableCell>
                        <Chip 
                          label={reservation.status}
                          color={reservation.status === 'active' ? "primary" : "default"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {reservation.status === 'active' && (
                          <Button size="small" color="primary">Return Book</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    );
  
    const SearchResults = () => (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper className="page-content">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4">Search Results for "{searchQuery}"</Typography>
            <Button 
              variant="outlined" 
              startIcon={<span className="material-icons">arrow_back</span>}
              onClick={() => {
                setShowSearchResults(false);
                setSearchQuery('');
              }}
            >
              Back
            </Button>
          </Box>
          
          {/* Users Results */}
          {searchResults.users.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <span className="material-icons" style={{ marginRight: '8px' }}>people</span>
                Users ({searchResults.users.length})
              </Typography>
              <Grid container spacing={2}>
                {searchResults.users.map(user => (
                  <Grid item key={user.id} xs={12} md={4}>
                    <UserCard user={user} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
  
          {/* Books Results */}
          {searchResults.books.length > 0 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <span className="material-icons" style={{ marginRight: '8px' }}>book</span>
                Books ({searchResults.books.length})
              </Typography>
              <Grid container spacing={2}>
                {searchResults.books.map(book => (
                  <Grid item key={book.id} xs={12} md={4}>
                    <BookCard book={book} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
  
          {searchResults.users.length === 0 && searchResults.books.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <span className="material-icons" style={{ fontSize: 48, color: '#666', marginBottom: 16 }}>
                search_off
              </span>
              <Typography variant="h6" color="textSecondary">
                No results found for "{searchQuery}"
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Try searching for a different term or check your spelling
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>
    );
  
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        paddingBottom: '60px',
        backgroundImage: 'url("https://cdn.pixabay.com/photo/2015/07/31/11/45/library-869061_1280.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        position: 'relative',
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1
        }} />
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Header />
          <QuickLinks />
          <Box sx={{ 
            flex: 1, 
            py: 4,
            position: 'relative',
          }}>
            {showSearchResults ? <SearchResults /> : (
              <>
                {page === 'home' && <HomePage />}
                {page === 'users' && <UsersPage />}
                {page === 'books' && <BooksPage />}
                {page === 'reservations' && <ReservationsPage />}
              </>
            )}
          </Box>
          <Footer />
        </Box>
  
        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
          <DialogTitle>Edit Item</DialogTitle>
          <DialogContent>
            {editItem && (
              <Box sx={{ pt: 2 }}>
                {Object.keys(editItem).map(key => {
                  if (key !== 'id') {
                    return (
                      <TextField
                        key={key}
                        fullWidth
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        value={editItem[key]}
                        onChange={(e) => setEditItem({
                          ...editItem,
                          [key]: e.target.value
                        })}
                        sx={{ mb: 2 }}
                      />
                    );
                  }
                  return null;
                })}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditSubmit} variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
  
        {/* View Details Dialog */}
        <Dialog open={isViewDialogOpen} onClose={() => setIsViewDialogOpen(false)}>
          <DialogTitle>View Details</DialogTitle>
          <DialogContent>
            {viewItem && (
              <Box sx={{ pt: 2 }}>
                {Object.entries(viewItem).map(([key, value]) => {
                  if (key !== 'id') {
                    return (
                      <Box key={key} sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="textSecondary">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Typography>
                        <Typography variant="body1">
                          {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                        </Typography>
                      </Box>
                    );
                  }
                  return null;
                })}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsViewDialogOpen(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  };
  
  ReactDOM.render(<App />, document.getElementById('root'));
  