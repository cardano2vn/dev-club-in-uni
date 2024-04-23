# Lab 02

## Cài đặt Cardano node bằng cách download file binary từ Github

Chuẩn bị môi trường
Trước tiên, cập nhật và nâng cấp các gói đã cài đặt trên Ubuntu:

```bash
sudo apt update && sudo apt upgrade -y
```

Cài đặt các gói cần thiết:

```bash
sudo apt install -y git curl build-essential pkg-config libffi-dev libgmp-dev libssl-dev libtinfo-dev libsystemd-dev zlib1g-dev make g++ tmux wget libncursesw5 libtool autoconf
```

Download file binary Cardano Node từ GitHub

```bash
mkdir $HOME/cardano
cd $HOME/cardano
wget https://github.com/IntersectMBO/cardano-node/releases/download/8.9.2/cardano-node-8.9.2-linux.tar.gz
tar -xzf cardano-node-8.9.2-linux.tar.gz
```

Cấu hình biến môi trường
Thêm đường dẫn của Cardano Node vào biến môi trường PATH:

```bash
export PATH=$PATH:$HOME/cardano/bin
```

Kiểm tra lại cấu hình biến môi trường bằng câu lệnh

```bash
cardano-node --version
```

Kết quả hiển thị như sau:

cardano-node 8.9.2 - linux-x86_64 - ghc-8.10
git rev 424983fa186786397f5a99539f51710abf62c37b

## Cấu hình và chạy một Relay Node trên Preview Testnet

Tải các file cấu hình cho mạng Preview

Các file cấu hình cho mạng Preview có thể được tải từ trang tài liệu chính thức:

```bash
mkdir -p /opt/cnode/preview/files
mkdir -p /opt/cnode/preview/db
mkdir -p /opt/cnode/preview/socket
cd /opt/cnode/preview/files
wget https://book.play.dev.cardano.org/environments/preview/config.json
wget https://book.play.dev.cardano.org/environments/preview/byron-genesis.json
wget https://book.play.dev.cardano.org/environments/preview/shelley-genesis.json
wget https://book.play.dev.cardano.org/environments/preview/alonzo-genesis.json
wget https://book.play.dev.cardano.org/environments/preview/conway-genesis.json
wget https://book.play.dev.cardano.org/environments/preview/topology.json
```

Câu lệnh chạy một Relay Node trên Preview network

```bash
cardano-node run \
  --topology /opt/cnode/preview/files/topology.json \
  --config /opt/cnode/preview/files/config.json \
  --database-path /opt/cnode/preview/db \
  --socket-path /opt/cnode/preview/socket/node.socket \
  --host-addr 0.0.0.0 \
  --port 3001
```

## Cấu hình và chạy một Block Producer Node trên Preview Testnet

Cấu hình topology cho Block Producer Node

```bash
touch /opt/cnode/preview/files/topology-bp.json
nano /opt/cnode/preview/files/topology-bp.json
```

Khởi chạy Block Producer node bằng câu lệnh như sau:

```bash
cardano-node run \
  --topology /opt/cnode/preview/files/topology-bp.json \
  --config /opt/cnode/preview/files/mainnet-config.json \
  --database-path /opt/cnode/preview/db \
  --socket-path /opt/cnode/preview/socket/node.socket \
  --host-addr 0.0.0.0 \
  --port 3000 \
  --shelley-kes-key /opt/cnode/preview/priv/pool/kes.skey \
  --shelley-vrf-key /opt/cnode/preview/priv/pool/vrf.skey \
  --shelley-operational-certificate /opt/cnode/preview/priv/pool/node.cert
```
