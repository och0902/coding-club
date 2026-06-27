class Menu extends HTMLElement {
   constructor() {
      super();
      this.activeMonth = '';
      this.searchQuery = '';
   }

   connectedCallback() {
      this.render();
   }

   setActiveMonth(month) {
      this.activeMonth = month;
      this.render();
   }

   setSearchQuery(query) {
      this.searchQuery = query.toLowerCase();
      this.render();
      const searchInput = this.querySelector('.search-input');
      if (searchInput) {
         searchInput.focus();
         searchInput.selectionStart = searchInput.selectionEnd = searchInput.value.length;
      }
   }

   render() {
      this.innerHTML = this.template();
      this.addEventListeners();
   }

   template() {
      let filteredItems = [];
      let isSearching = this.searchQuery.length > 0;

      if (isSearching) {
         menuItems.forEach((item) => {
            const matchingLectures = item.lectures.filter(lec => lec.name.toLowerCase().includes(this.searchQuery));
            if (matchingLectures.length > 0) {
               filteredItems.push({
                  title: item.title,
                  lectures: matchingLectures
               });
            }
         });
      }

      // Grouping menuItems by month (MM)
      const groupedByMonth = {};
      menuItems.forEach((item) => {
         const monthPart = item.title.split('.')[0]; // e.g. '12'
         if (!groupedByMonth[monthPart]) {
            groupedByMonth[monthPart] = [];
         }
         groupedByMonth[monthPart].push(item);
      });
      const monthsList = Object.keys(groupedByMonth).sort((a, b) => parseInt(b, 10) - parseInt(a, 10));
      
      // Default to the most recent month if not set
      if (!this.activeMonth || !monthsList.includes(this.activeMonth)) {
         this.activeMonth = monthsList[0];
      }
      
      const monthNames = {
         '12': 'December', '11': 'November', '10': 'October', '09': 'September',
         '08': 'August', '07': 'July', '06': 'June', '05': 'May'
      };

      return `
         <div class="menu-dashboard">
            <div class="search-container">
               <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
               </svg>
               <input type="text" class="search-input" placeholder="Search lectures..." value="${this.searchQuery ? this.searchQuery : ''}">
            </div>

            ${isSearching ? `
               <div class="search-results-header">
                  <h3>Search Results for "${this.searchQuery}" (${filteredItems.reduce((acc, item) => acc + item.lectures.length, 0)} found)</h3>
               </div>
               <div class="results-container">
                  ${filteredItems.length === 0 ? `
                     <div class="no-results">No lectures found matching your search.</div>
                  ` : `
                     <div class="card-grid active">
                        ${filteredItems.map(item => 
                           item.lectures.map(lecture => this.renderCard(lecture, item.title)).join('')
                        ).join('')}
                     </div>
                  `}
               </div>
            ` : `
               <ul class="tabs-container">
                  ${monthsList.map((m) => `
                     <li class="tab-item ${this.activeMonth === m ? 'active' : ''}" data-month="${m}">
                        ${monthNames[m] || `${m}월`}
                     </li>
                  `).join('')}
               </ul>
               
               <div class="tab-content">
                  <div class="sessions-timeline">
                     ${groupedByMonth[this.activeMonth] ? groupedByMonth[this.activeMonth].map((session) => `
                        <div class="session-section">
                           <div class="session-header">
                              <span class="session-date-badge">${session.title} Session</span>
                              <div class="session-divider-line"></div>
                           </div>
                           <div class="card-grid active">
                              ${session.lectures.map(lecture => this.renderCard(lecture)).join('')}
                           </div>
                        </div>
                     `).join('') : ''}
                  </div>
               </div>
            `}
         </div>
      `;
   }

   renderCard(lecture, dateTag = '') {
      let iconSvg = '';
      let typeLabel = 'Web Page';
      let isPdf = lecture.href.endsWith('.pdf');
      let isPptx = lecture.href.endsWith('.pptx');

      if (isPdf) {
         typeLabel = 'PDF Document';
         iconSvg = `
            <svg class="card-icon pdf" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
               <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
               <polyline points="14 2 14 8 20 8"></polyline>
               <line x1="16" y1="13" x2="8" y2="13"></line>
               <line x1="16" y1="17" x2="8" y2="17"></line>
               <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
         `;
      } else if (isPptx) {
         typeLabel = 'Presentation';
         iconSvg = `
            <svg class="card-icon pptx" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
               <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
               <line x1="9" y1="17" x2="9" y2="8"></line>
               <polyline points="9 8 13 8 13 13 9 13"></polyline>
            </svg>
         `;
      } else {
         iconSvg = `
            <svg class="card-icon web" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
               <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
               <polyline points="2 17 12 22 22 17"></polyline>
               <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
         `;
      }

      return `
         <a href="${lecture.href}" target="_blank" class="card-link">
            <div class="lecture-card">
               <div class="card-glow"></div>
               <div class="card-content-wrapper">
                  <div class="icon-wrapper">
                     ${iconSvg}
                  </div>
                  <div class="card-details">
                     <span class="card-type">${typeLabel} ${dateTag ? `<span class="card-date-tag">${dateTag}</span>` : ''}</span>
                     <h4 class="card-name">${lecture.name}</h4>
                  </div>
                  <div class="arrow-wrapper">
                     <svg class="card-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                     </svg>
                  </div>
               </div>
            </div>
         </a>
      `;
   }

   addEventListeners() {
      const tabItems = this.querySelectorAll('.tab-item');
      tabItems.forEach(tab => {
         tab.addEventListener('click', () => {
            const month = tab.getAttribute('data-month');
            this.setActiveMonth(month);
         });
      });

      const searchInput = this.querySelector('.search-input');
      if (searchInput) {
         searchInput.addEventListener('input', (e) => {
            this.setSearchQuery(e.target.value);
         });
      }
   }
}

window.customElements.define('menu-comp', Menu);
