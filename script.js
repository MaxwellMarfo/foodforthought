// Sample data - In production, this would come from a database
let mediaContent = [
    {
        id: 1,
        title: "Dream Big",
        description: "Powerful music to listen to always",
        type: "audio",
        category: "motivation",
        file: "dream.mp3",
        thumbnail: "dream.jpg",
        uploadDate: "2025-01-15",
        views: 156
    },
    {
        id: 2,
        title: "Welcome",
        description: "Discover your unique path in life",
        type: "audio",
        category: "personal-growth",
        file: "Welcome.mp3",
        thumbnail: "welcome.jpg",
        uploadDate: "2025-01-10",
        views: 895
    },
    {
        id: 3,
        title: "Positive Mindset about love",
        description: "learning to love",
        type: "audio",
        category: "mindset",
        file: "love 'part 1'.mp3",
        thumbnail: "love 1.jpg",
        uploadDate: "2025-01-08",
        views: 851
    },
    {
        id: 4,
        title: "The pain of love",
        description: "The damaging effects of love",
        type: "audio",
        category: "mindset",
        file: "love 'part 2'.mp3",
        thumbnail: "love 2.jpg",
        uploadDate: "2025-01-08",
        views: 765
    },
     {
        id: 5,
        title: "The right side of trust",
        description: "Having a healthy perspective on trust",
        type: "audio",
        category: "mindset",
        file: "trust 'part 1'.mp3",
        thumbnail: "trust 1.jpg",
        uploadDate: "2025-01-08",
        views: 675
    }
   
];

let blogPosts = [
    {
        id: 1,
        title: "The Power of Morning Routines",
        content: "Starting your day with intention can transform your entire life. A powerful morning routine sets the tone for success, productivity, and mental clarity...",
        excerpt: "Discover how establishing a powerful morning routine can transform your entire day and set you up for success.",
        author: "Maxwell Nsiah Marfo",
        date: "2025-03-15",
        image: "uploads/images/blog-morning.jpg",
        views: 234
    },
    {
        id: 2,
        title: "Overcoming Fear of Failure",
        content: "Fear of failure is one of the biggest obstacles to success. Learn practical strategies to overcome this fear and pursue your dreams with confidence...",
        excerpt: "Learn practical strategies to overcome the fear that holds you back from pursuing your dreams.",
        author: "Maxwell Nsiah Marfo",
        date: "2025-03-10",
        image: "uploads/images/blog-fear.jpg",
        views: 189
    }
];

let events = [
    {
        id: 1,
        title: "Transformation Workshop",
        date: "2025-04-15",
        time: "09:00 AM",
        location: "Kumasi Cultural Center",
        description: "A full-day workshop focused on personal transformation and goal setting. Learn practical strategies to overcome limitations and achieve your dreams.",
        image: "uploads/images/event-workshop.jpg",
        registered: 67,
        capacity: 100
    },
    {
        id: 2,
        title: "Virtual Motivation Session",
        date: "Every Sunday",
        time: "06:00 PM",
        location: "Zoom Online",
        description: "Join our weekly virtual motivation sessions from anywhere in the world. Connect with like-minded individuals and get inspired.",
        image: "uploads/images/event-virtual.jpg",
        registered: 45,
        capacity: 200
    }
];

// Page Navigation
function showPage(pageId) {
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0, 0);
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Media Filtering
function filterMedia(type) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    loadMediaContent(type);
}

// Load Media Content
function loadMediaContent(filter = 'all') {
    const mediaGrid = document.getElementById('mediaGrid');
    
    let filteredMedia = mediaContent;
    if (filter !== 'all') {
        filteredMedia = mediaContent.filter(item => item.type === filter);
    }

    if (filteredMedia.length === 0) {
        mediaGrid.innerHTML = `
            <div class="no-content" style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <i class="fas fa-inbox" style="font-size: 3rem; color: var(--text-light); margin-bottom: 1rem;"></i>
                <h3>No ${filter === 'all' ? '' : filter + ' '}content available</h3>
                <p>Check back soon for new inspirational content!</p>
            </div>
        `;
        return;
    }

    mediaGrid.innerHTML = filteredMedia.map(item => {
        const iconClass = item.type === 'audio' ? 'fa-microphone' : 
                         item.type === 'video' ? 'fa-video' : 'fa-image';
        
        return `
            <div class="media-item" data-type="${item.type}">
                <div class="media-thumbnail">
                    ${item.thumbnail ? 
                        `<img src="${item.thumbnail}" alt="${item.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">` : 
                        ''
                    }
                    <div class="thumbnail-placeholder" style="${item.thumbnail ? 'display: none;' : ''}">
                        <i class="fas ${iconClass}"></i>
                    </div>
                </div>
                <div class="media-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <div class="media-meta">
                        <small>${item.type.toUpperCase()} • ${new Date(item.uploadDate).toLocaleDateString()} • ${item.views} views</small>
                    </div>
                    <div class="media-actions">
                        <button class="btn-stream" onclick="playMedia('${item.type}', '${item.file}', '${item.title}')">
                            <i class="fas fa-play"></i> ${item.type === 'audio' ? 'Listen' : 'Watch'}
                        </button>
                        <a href="${item.file}" download class="btn-download">
                            <i class="fas fa-download"></i> Download
                        </a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Load Blog Content
function loadBlogContent() {
    const blogGrid = document.getElementById('blogGrid');
    
    blogGrid.innerHTML = blogPosts.map(post => `
        <article class="media-item">
            <div class="media-thumbnail">
                ${post.image ? 
                    `<img src="${post.image}" alt="${post.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">` : 
                    ''
                }
                <div class="thumbnail-placeholder" style="${post.image ? 'display: none;' : ''}">
                    <i class="fas fa-edit"></i>
                </div>
            </div>
            <div class="media-content">
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <div class="media-meta">
                    <small>By ${post.author} • ${new Date(post.date).toLocaleDateString()} • ${post.views} views</small>
                </div>
                <div class="media-actions">
                    <button class="btn-stream" onclick="readBlogPost(${post.id})">
                        <i class="fas fa-book-open"></i> Read More
                    </button>
                </div>
            </div>
        </article>
    `).join('');
}

// Load Events Content
function loadEventsContent() {
    const eventsGrid = document.getElementById('eventsGrid');
    
    eventsGrid.innerHTML = events.map(event => `
        <div class="media-item">
            <div class="media-thumbnail">
                ${event.image ? 
                    `<img src="${event.image}" alt="${event.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">` : 
                    ''
                }
                <div class="thumbnail-placeholder" style="${event.image ? 'display: none;' : ''}">
                    <i class="fas fa-calendar"></i>
                </div>
            </div>
            <div class="media-content">
                <h3>${event.title}</h3>
                <p><strong>Date:</strong> ${event.date} ${event.time ? `at ${event.time}` : ''}</p>
                <p><strong>Location:</strong> ${event.location}</p>
                <p>${event.description}</p>
                <div class="media-meta">
                    <small>${event.registered}/${event.capacity} registered</small>
                </div>
                <div class="media-actions">
                    <button class="btn-stream" onclick="registerForEvent(${event.id})">
                        <i class="fas fa-user-plus"></i> Register
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Media Playback
function playMedia(type, file, title) {
    if (type === 'audio') {
        const audio = new Audio(file);
        audio.play().catch(e => {
            alert(`Unable to play audio: ${file}\n\nPlease ensure the file exists in the uploads folder.`);
        });
    } else if (type === 'video') {
        window.open(file, '_blank');
    }
    // Increment view count (in production, this would update the database)
    const mediaItem = mediaContent.find(item => item.file === file);
    if (mediaItem) {
        mediaItem.views++;
    }
}

// Blog Post Reading
function readBlogPost(postId) {
    const post = blogPosts.find(p => p.id === postId);
    if (post) {
        alert(`Reading: ${post.title}\n\n${post.content}\n\n(In production, this would open a full blog post page)`);
        post.views++;
    }
}

// Event Registration
function registerForEvent(eventId) {
    const event = events.find(e => e.id === eventId);
    if (event) {
        if (event.registered < event.capacity) {
            event.registered++;
            alert(`Successfully registered for: ${event.title}\n\nWe look forward to seeing you!`);
            loadEventsContent(); // Refresh to show updated registration count
        } else {
            alert('Sorry, this event is fully booked. Please check back for future events.');
        }
    }
}

// Form Submission
function submitBooking(event) {
    event.preventDefault();
    alert('Session booking request submitted! We will contact you within 24 hours.');
    event.target.reset();
}

// Initialize website
document.addEventListener('DOMContentLoaded', function() {
    // Load initial content
    loadMediaContent();
    loadBlogContent();
    loadEventsContent();
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.nav-links').classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-menu')) {
            document.querySelector('.nav-links').classList.remove('active');
        }
    });
});
