# QuizMaster Admin Panel - Design & Component Guide

## Design Philosophy

The Admin Panel is built with:
- **Clean, Modern Interface**: Minimalist design with focus on usability
- **Consistent Design Language**: Matches main QuizMaster platform
- **Professional Appearance**: Corporate, trustworthy look
- **Intuitive Navigation**: Sidebar-based easy access
- **Responsive Layout**: Works on all screen sizes

---

## Color Palette

### Primary Colors
```css
--primary-color: #007bff;        /* Blue - Main actions */
--success-color: #28a745;         /* Green - Positive actions */
--warning-color: #ffc107;         /* Yellow - Caution */
--danger-color: #dc3545;          /* Red - Destructive */
--info-color: #17a2b8;            /* Cyan - Information */
```

### Neutral Colors
```css
--light-color: #f8f9fa;           /* Light backgrounds */
--dark-color: #343a40;            /* Dark text */
--secondary-color: #6c757d;       /* Secondary text */
```

### Usage Rules
- **Primary Blue**: Main buttons, active states, primary actions
- **Success Green**: Positive metrics, completed actions, success messages
- **Warning Yellow**: Alerts, caution states, important notices
- **Danger Red**: Delete buttons, error states, critical actions
- **Info Cyan**: Information badges, statistics, highlights

---

## Typography

### Font Stack
```css
font-family: 'Inter', system-ui, -apple-system, sans-serif;
```

### Font Sizes
- **Headings (h2)**: 1.8rem / 28.8px - Page titles
- **Section Headers**: 1.5rem / 24px - Section headings
- **Card Titles**: 1.1rem / 17.6px - Card headings
- **Body Text**: 1rem / 16px - Regular text
- **Small Text**: 0.85rem / 13.6px - Metadata, badges
- **Tiny Text**: 0.75rem / 12px - Captions

### Font Weights
- **Light**: 300 - Subtle text
- **Regular**: 400 - Body content
- **Medium**: 500 - Semi-emphasis
- **Semi-bold**: 600 - Labels, emphasis
- **Bold**: 700 - Headings, titles

---

## Component Specifications

### Cards
```
Styling:
- Border radius: 10px
- Box shadow: 0 2px 10px rgba(0,0,0,0.08)
- Hover shadow: 0 5px 20px rgba(0,0,0,0.12)
- Background: White
- Padding: 20px

Animation:
- Transition: all 0.3s ease
- Hover effect: translateY(-5px)
```

### Buttons
```
Base Button:
- Border radius: 8px
- Font weight: 600
- Padding: 10px 20px
- Transition: all 0.3s ease

Hover States:
- Scale: translateY(-2px)
- Shadow: 0 4px 12px rgba(color, 0.3)
- Cursor: pointer

Small Buttons:
- Padding: 6px 12px
- Font size: 0.85rem

States:
- Default: Gray background
- Primary: Blue background
- Success: Green background
- Warning: Yellow background
- Danger: Red background
```

### Forms
```
Input Fields:
- Border radius: 8px
- Border: 1px solid #e9ecef
- Padding: 10px 15px
- Transition: all 0.3s ease

Focus State:
- Border color: #007bff
- Box shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25)

Labels:
- Font weight: 600
- Color: #343a40
- Margin bottom: 8px
```

### Tables
```
Header:
- Background: #f8f9fa
- Border: 2px solid #e9ecef
- Font weight: 600
- Padding: 15px

Rows:
- Hover background: #f8f9fa
- Border: 1px solid #e9ecef
- Padding: 15px
- Transition: background-color 0.2s ease

Responsive:
- On mobile: Font size 0.8rem
- Adjust padding for smaller screens
```

### Stat Cards
```
Layout:
- Display: flex
- Gap: 15px
- Align: center
- Padding: 20px
- Border radius: 10px

Icon Box:
- Width/Height: 60px
- Border radius: 10px
- Display: flex (center items)
- Font size: 1.5rem
- Color: White

Content:
- Title: 0.85rem, secondary color
- Number: 1.8rem, bold, dark color

Hover:
- Transform: translateY(-5px)
- Enhanced shadow
```

### Badges
```
Standard Badge:
- Padding: 8px 12px
- Border radius: 6px
- Font weight: 600
- Font size: 0.85rem

Color Variants:
- Success: Green background, green text
- Warning: Yellow background, brown text
- Danger: Red background, red text
- Info: Cyan background, cyan text
- Background opacity: 15%
```

### Modals
```
Content:
- Border radius: 10px
- Box shadow: 0 10px 40px rgba(0,0,0,0.2)
- Background: White

Header:
- Border: 1px solid #e9ecef
- Padding: 20px
- Font weight: 600

Body:
- Padding: 20px

Footer:
- Background: #f8f9fa
- Border: 1px solid #e9ecef
- Padding: 15px 20px
```

### Sidebar
```
Dimensions:
- Width: 260px
- Height: calc(100vh - 100px)
- Position: sticky
- Top: 90px
- Overflow: auto

Styling:
- Background: White
- Border radius: 10px
- Box shadow: 0 2px 10px rgba(0,0,0,0.08)
- Padding: 20px

Nav Links:
- Padding: 12px 15px
- Margin: 8px 0
- Border radius: 8px
- Border left: 3px transparent
- Transition: all 0.3s ease

Active State:
- Background: rgba(0, 123, 255, 0.1)
- Color: #007bff
- Font weight: 600
- Border left color: #007bff

Hover State:
- Background: #f8f9fa
- Color: #007bff
- Border left color: #007bff
- Transform: translateX(5px)
```

---

## Responsive Breakpoints

### Desktop (> 1024px)
```
Layout: Flexbox with sidebar
Sidebar: 260px fixed
Content: Flexible, fills remaining space
Cards: 4-column grid where applicable
Gaps: 20px between elements
```

### Tablet (768px - 1024px)
```
Layout: Flexbox with adjusted sidebar
Sidebar: 220px (narrower)
Content: Adjusted gaps (15px)
Cards: 2-3 column grid
Text: Slightly reduced
```

### Mobile (< 768px)
```
Layout: Stacked (flex-direction: column)
Sidebar: Full width, horizontal scroll for nav
Content: Single column
Cards: 1-column grid
Gaps: 10px
Buttons: Full width
Text: Reduced further
```

---

## Animation Effects

### Fade In
```css
animation: fadeIn 0.3s ease-in-out;

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

### Spin (Loading)
```css
animation: spin 1s linear infinite;

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
```

### Hover Lift
```css
transition: all 0.3s ease;
&:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0,0,0,0.12);
}
```

---

## Spacing System

### Padding/Margin Scale
- **xs**: 5px
- **sm**: 10px
- **md**: 15px
- **lg**: 20px
- **xl**: 30px

### Gap Values
- Between sections: 30px
- Between elements: 20px
- Between cards: 15px
- Within cards: 20px
- Form fields: 15px bottom margin

---

## Accessibility

### Color Contrast
- Text on background: Minimum 4.5:1 ratio
- Icons and graphics: Minimum 3:1 ratio
- All colors have text alternatives (badges, labels)

### Interactive Elements
- Minimum touch target: 44x44px
- Keyboard navigation: Full support
- Focus indicators: Visible on all interactive elements

### Screen Readers
- Semantic HTML structure
- ARIA labels where needed
- Descriptive button text
- Form labels associated with inputs

---

## State Indicators

### Loading State
```
- Spinner icon
- Text: "Loading..."
- Placeholder content
- Disabled interactions
```

### Error State
```
- Red border/background
- Error icon: ⚠️
- Error message in red
- Helpful suggestion text
```

### Success State
```
- Green checkmark: ✓
- Success message in green
- Brief notification (auto-dismiss after 3s)
```

### Empty State
```
- Empty state icon
- Message: "No [items] yet"
- Call to action button
- Helpful text
```

---

## Icon Guidelines

### Icon Library
Using Font Awesome 6.0.0

### Common Icons
- Dashboard: `fas fa-chart-line`
- Quizzes: `fas fa-book`
- Questions: `fas fa-question-circle`
- Users: `fas fa-users`
- Settings: `fas fa-cog`
- Edit: `fas fa-edit`
- Delete: `fas fa-trash`
- Add: `fas fa-plus`
- Save: `fas fa-save`
- View: `fas fa-eye`
- Search: `fas fa-search`
- Filter: `fas fa-filter`
- Export: `fas fa-download`
- Success: `fas fa-check-circle`
- Error: `fas fa-exclamation-circle`
- Info: `fas fa-info-circle`

### Icon Usage
- Size: 1rem for text, 1.5rem for headings, 3rem for highlights
- Margin: 8-10px when next to text
- Color: Inherit from parent element

---

## Typography Examples

### Page Title
```
Font size: 1.8rem
Font weight: 700
Color: #343a40
Margin bottom: 30px
```

### Section Header
```
Font size: 1.5rem
Font weight: 700
Color: #343a40
Margin bottom: 20px
```

### Card Title
```
Font size: 1.1rem
Font weight: 600
Color: #343a40
```

### Body Text
```
Font size: 1rem
Font weight: 400
Color: #343a40
Line height: 1.6
```

### Label Text
```
Font size: 0.85rem
Font weight: 600
Color: #343a40
Margin bottom: 8px
```

---

## Shadow System

### Subtle Shadow (Cards)
```css
box-shadow: 0 2px 10px rgba(0,0,0,0.08);
```

### Medium Shadow (Hover)
```css
box-shadow: 0 5px 20px rgba(0,0,0,0.12);
```

### Strong Shadow (Modals)
```css
box-shadow: 0 10px 40px rgba(0,0,0,0.2);
```

---

## Border Radius System
- **Small**: 5px (badges, small elements)
- **Medium**: 8px (buttons, form controls)
- **Large**: 10px (cards, large containers)

---

## Consistency Checklist

- ✅ Colors match palette
- ✅ Spacing follows grid system
- ✅ Typography matches specifications
- ✅ Shadows are appropriate depth
- ✅ Icons are from Font Awesome
- ✅ Buttons follow sizing guidelines
- ✅ Forms are consistent
- ✅ Hover states are implemented
- ✅ Mobile responsive
- ✅ Accessibility standards met

---

This design guide ensures consistent, professional appearance across the entire admin panel while maintaining alignment with the main QuizMaster platform design.
