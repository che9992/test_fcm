import { TouchableOpacity, Txt, V } from '@/_ui';
import React from 'react';

export default function FilterResultBar({
  search,
  onCancel,
}: {
  search: any;
  onCancel: () => void;
}) {
  return (
    <>
      {!!search && (
        <V.Row gap={10} align='center' margin={{ top: 10 }}>
          <Txt as='b' size={16}>
            {search} 의 검색결과
          </Txt>
          <TouchableOpacity onClick={onCancel}>취소</TouchableOpacity>
        </V.Row>
      )}
    </>
  );
}
