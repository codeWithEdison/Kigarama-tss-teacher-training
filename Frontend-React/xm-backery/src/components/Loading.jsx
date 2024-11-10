import React from 'react';

const ProductListLoading = () => {
  const skeletonItems = Array(8).fill(null); // Creates 8 skeleton items

  const containerStyle = {
    padding: '20px',
    backgroundColor: '#f9fafb',
    minHeight: '100vh',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  };

  const imageSkeletonStyle = {
    width: '100%',
    height: '200px',
    backgroundColor: '#e5e7eb',
    position: 'relative',
    overflow: 'hidden',
  };

  const contentSkeletonStyle = {
    padding: '16px',
  };

  const titleSkeletonStyle = {
    height: '20px',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    marginBottom: '12px',
    width: '80%',
  };

  const priceSkeletonStyle = {
    height: '24px',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    width: '40%',
  };

  const descriptionSkeletonStyle = {
    height: '16px',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    margin: '12px 0',
  };

  const buttonSkeletonStyle = {
    height: '36px',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    marginTop: '16px',
  };

  return (
    <>
      <style>
        {`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }

          .shimmer {
            position: relative;
          }

          .shimmer::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.4) 50%,
              rgba(255, 255, 255, 0) 100%
            );
            animation: shimmer 1.5s infinite;
          }

          .card-skeleton {
            transition: transform 0.2s;
          }

          .card-skeleton:hover {
            transform: translateY(-4px);
          }

          .header-skeleton {
            height: 36px;
            background-color: #e5e7eb;
            border-radius: 4px;
            margin-bottom: 24px;
            max-width: 200px;
          }

          .filter-skeleton {
            height: 40px;
            background-color: #e5e7eb;
            border-radius: 4px;
            margin-bottom: 24px;
            max-width: 100%;
            display: flex;
            gap: 12px;
          }

          .filter-item {
            height: 100%;
            width: 120px;
            background-color: #e5e7eb;
            border-radius: 4px;
          }
        `}
      </style>

      <div style={containerStyle}>
        {/* Header Skeleton */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '32px' }}>
          <div className="header-skeleton shimmer"></div>
          <div className="filter-skeleton shimmer">
            <div className="filter-item"></div>
            <div className="filter-item"></div>
            <div className="filter-item"></div>
          </div>
        </div>

        {/* Product Grid */}
        <div style={gridStyle}>
          {skeletonItems.map((_, index) => (
            <div key={index} style={cardStyle} className="card-skeleton">
              {/* Image Skeleton */}
              <div style={imageSkeletonStyle} className="shimmer"></div>

              {/* Content Skeleton */}
              <div style={contentSkeletonStyle}>
                <div style={titleSkeletonStyle} className="shimmer"></div>
                <div style={priceSkeletonStyle} className="shimmer"></div>
                <div style={{ ...descriptionSkeletonStyle, width: '100%' }} className="shimmer"></div>
                <div style={{ ...descriptionSkeletonStyle, width: '70%' }} className="shimmer"></div>
                <div style={buttonSkeletonStyle} className="shimmer"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductListLoading;