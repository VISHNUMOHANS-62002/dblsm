const { 
    Button, AppBar, Toolbar, Typography, Container, Grid, Card, CardContent,
    TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions,
    Snackbar, Alert, Box, Chip
  } = MaterialUI;
  
  const API_URL = 'http://localhost:3000/api';
  
  const App = () => {
    const [page, setPage] = React.useState('home');
    const [searchQuery, setSearchQuery] = React.useState('');
    const [searchResults, setSearchResults] = React.useState({ users: [], books: [] });
    const [showSearchResults, setShowSearchResults] = React.useState(false);
    const [users, setUsers] = React.useState([]);
    const [books, setBooks] = React.useState([]);
    const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: 'info' });
  
    // Fetch data from MongoDB when component mounts
    React.useEffect(() => {
      fetchUsers();
      fetchBooks();
    }, []);
  
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/users`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setSnackbar({
          open: true,
          message: 'Error fetching users',
          severity: 'error'
        });
      }
    };
  
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${API_URL}/books`);
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
        setSnackbar({
          open: true,
          message: 'Error fetching books',
          severity: 'error'
        });
      }
    };
  
    const addUser = async (userData) => {
      try {
        const response = await fetch(`${API_URL}/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        const newUser = await response.json();
        setUsers([...users, newUser]);
        setSnackbar({
          open: true,
          message: 'User added successfully',
          severity: 'success'
        });
      } catch (error) {
        console.error('Error adding user:', error);
        setSnackbar({
          open: true,
          message: 'Error adding user',
          severity: 'error'
        });
      }
    };
  
    const addBook = async (bookData) => {
      try {
        const response = await fetch(`${API_URL}/books`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookData),
        });
        const newBook = await response.json();
        setBooks([...books, newBook]);
        setSnackbar({
          open: true,
          message: 'Book added successfully',
          severity: 'success'
        });
      } catch (error) {
        console.error('Error adding book:', error);
        setSnackbar({
          open: true,
          message: 'Error adding book',
          severity: 'error'
        });
      }
    };
  
    // Rest of your existing UI components and logic...
    // (Keep your existing UI rendering code here)
  
    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Library Management System
            </Typography>
            <Button color="inherit" onClick={() => setPage('home')}>Home</Button>
            <Button color="inherit" onClick={() => setPage('users')}>Users</Button>
            <Button color="inherit" onClick={() => setPage('books')}>Books</Button>
          </Toolbar>
        </AppBar>
  
        <Container style={{ marginTop: '2rem' }}>
          {/* Your existing UI components */}
        </Container>
  
        <Snackbar 
          open={snackbar.open} 
          autoHideDuration={6000} 
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </React.Fragment>
    );
  };
  
  ReactDOM.render(<App />, document.getElementById('root'));
  