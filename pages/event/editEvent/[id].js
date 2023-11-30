import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleEvent } from '../../../api/eventData';
import EventForm from '../../../components/forms/eventform';

export default function EditEvent() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleEvent(id).then(setEditItem);
  }, [id]);
  return (
    <>
      <EventForm eventObj={editItem} />
    </>
  );
}
