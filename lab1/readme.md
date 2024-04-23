# Lab 01

## Chuyển đổi từ 24 cụm từ sang Public và Private Key

### Bước 1: Tạo file lưu trữ 24 cụm từ

```bash
nano recovery-phrase.prv
```

Nhập 24 cụm từ khôi phục của bạn, ví dụ: phrase1 phrase2 phrase3 phrase4 phrase5 phrase6 phrase7 phrase8 phrase9 phrase10 phrase11 phrase12 phrase13 phrase14 phrase15 phrase16 phrase17 phrase18 phrase19 phrase20 phrase21 phrase22 phrase23 phrase24

Bấm Ctrl+O -> Enter để lưu nội dung

Bấm Ctrl+Q để thoát chương trình soạn thảo nano.

### Bước 2: Khôi phục root master key (khóa gốc)

```bash
cardano-address key from-recovery-phrase Shelley < recovery-phrase.prv > root.prv
```

### Bước 3: Tạo cặp khóa thanh toán

```bash
cardano-address key child 1852H/1815H/0H/0/0 < root.prv > payment-0.prv
cardano-address key public --without-chain-code < payment-0.skey > payment-0.pub
```

### Bước 4: Chuyển đổi định dạng khóa thanh toán với cardano-cli

#### Tạo khóa signing key

```bash
cardano-cli key convert-cardano-address-key \
  --shelley-payment-key \
  --signing-key-file  payment-0.prv \
  --out-file  payment-0.skey
```

#### Tạo khóa verification key

```bash
cardano-cli key verification-key \
  --signing-key-file  payment-0.skey \
  --verification-key-file  payment-0.vkey
```
