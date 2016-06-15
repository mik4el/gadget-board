FROM nginx:latest
RUN rm /etc/nginx/conf.d/*
ADD m4bd_se.conf /etc/nginx/conf.d/m4bd_se.conf

# Add pregenerated SSL certs from host, remember to add certs to host folder ssl
ADD ssl/m4bd_se.ssl-bundle.crt /etc/nginx/ssl/m4bd_se/m4bd_se.ssl-bundle.crt
ADD ssl/m4bd_se.key /etc/nginx/ssl/m4bd_se/m4bd_se.key
ADD ssl/dhparam.pem /etc/nginx/ssl/m4bd_se/dhparam.pem
ADD ssl/PositiveSSLBundle.cer /etc/nginx/ssl/m4bd_se/PositiveSSLBundle.cer