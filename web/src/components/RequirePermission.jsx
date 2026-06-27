import React from 'react';
import { useAppContext } from '../contexts/AppContext';

export default function RequirePermission({ permission, children, fallback = null }) {
  const { hasPermission } = useAppContext();

  if (hasPermission(permission)) {
    return <>{children}</>;
  }

  return fallback ? <>{fallback}</> : null;
}
