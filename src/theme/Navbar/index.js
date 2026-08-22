import OriginalNavbar from '@theme-original/Navbar';
import SearchBar from '@theme/SearchBar';

export default function Navbar() {
  // Docusaurus' table-of-contents positioning expects a .navbar element.
  // Keep an invisible, zero-height anchor while removing the desktop header.
  return (
    <>
      <div className="navbar oraxen-navbar-anchor" aria-hidden="true" />
      <div className="oraxen-desktop-search">
        <SearchBar />
      </div>
      <div className="oraxen-mobile-navbar">
        <OriginalNavbar />
      </div>
    </>
  );
}
