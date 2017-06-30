var config = {
    domain: 'unitest.vn',
    apiKey: 'key-0c4ad185d44ca6f747f85db16e49b3b4'
};
var MailGun = require('mailgun-js')(config);
var AccountModel = require('../models/member');

var service = {};

service.send = function(from, to, subject, text) {
    data = {
        from: from,
        to: to,
        subject: subject,
        text: text
    }
    MailGun.messages().send(data, function(err, body) {
        console.log(err);
        console.log(body);
    })
}

service.sendConfirmEmail = function(activeLink, userEmail, callBack, isTest) {
    async.waterfall(
        [
            function(done) {
                CRUD.ReadOne(configModel, {}, 'default_confirm_email_template', function(err, result) {
                    if (err)
                        return done(err);
                    done(null, result.default_confirm_email_template);
                })
            },
            function(template, done) {
                data = {
                    from: 'Account Service <account.service@unitest.vn>',
                    to: userEmail,
                    subject: template.Title,
                    html: template.Content
                };
                data.subject = isTest ? data.subject + ` (Test Email ${Date.now()})` : data.subject;
                data.html = data.html.split('#link').join(`<a href="${activeLink}">${activeLink}</a>`);
                MailGun.messages().send(data, callBack);
            }
        ],
        function(err) {
            return res.status(500).json(err);
        }
    )
}

service.sendToUser = function(data, userId) {
    CRUD.ReadOne(AccountModel, { _id: userId }, '', function(err, result) {
        if (err)
            console.log(err);
        data.to = result.Email;
        console.log(result);
        MailGun.messages().send(data, function(err, result) {
            if (err)
                console.log(err);
            console.log('an email is sent to ' + data.to);
        })
    })
}

service.notifyNewAccount = function(req, id) {
    CRUD.ReadOne(GroupModel, { GroupName: 'admin' }, '', function(err, result) {
        if (err)
            console.log(err);
        var data = {
            from: 'Unitest service <service@unitest.vn>',
            subject: '[Unitest] {{Email}} vừa đăng kí tại Unitest.vn',
            html: '<p>Một tài khoản vừa đăng kí tài khoản với Email {{Email}}</p>' +
                '<p>Kích hoạt tài khoản đó? <a href="http://{{host}}/home/account-list?id={{id}}">Kích hoạt ngay</a> </p>'
        }
        data.subject = data.subject.replace('{{Email}}', req.body.Email);
        data.html = data.html.replace('{{Email}}', req.body.Email);
        data.html = data.html.replace('{{host}}', req.headers.host);
        data.html = data.html.replace('{{id}}', id);
        service.sendToGroup(data, result.id);
    })
}

service.sendToGroup = function(data, groupId) {
    CRUD.Read(AccountModel, { UserGroup: groupId }, '', function(err, result) {
        if (err)
            console.log(err);
        data.to = result.map(x => x.Email).join(', ');
        // console.log(data);
        MailGun.messages().send(data, function(err, result) {
            if (err)
                console.log(err);
            console.log('an email is sent to ' + data.to);
        })
    })
}

service.sendResetToken = function(token, email, host, callback) {
    host = host.indexOf('http') > -1 ? host : 'http://' + host;
    var data = {
        from: 'Unitest service <service@unitest.vn>',
        subject: '[Unitest] Khôi phục password tại Unitest.vn',
        html: `<p>Bạn hoặc ai đó vừa dùng tính năng khôi phục mật khẩu tại <a href="http://unitest.vn">unitest.vn</a></p>` +
            `<p>Nếu chính bạn thực hiện hành động này hãy click hoặc paste đường dẫn sau vào trình duyệt web <a href="${host}/auth/reset?token=${token}">${host}/auth/reset?token=${token}</a></p>` +
            `<p>Nếu không phải là bạn thì vui lòng bỏ qua email này!</p>` +
            `----` +
            `<p>Trân trọng</p>` +
            `<strong>Bp. Kỹ thuật</strong>`,
        to: email
    }
    MailGun.messages().send(data, callback);
}

service.sendResetSuccess = function(email, userName) {
    var data = {
        from: 'Unitest service <service@unitest.vn>',
        subject: '[Unitest] Khôi phục password thành công',
        to: email,
        html: `<p>Chúc mừng, <strong>${userName}</strong>, bạn đã khôi phục mật khẩu thành công tại <a href="http://unitest.vn">unitest.vn</a></p>` +
            `----` +
            `<p>Trân trọng</p>` +
            `<strong>Bp. Kỹ thuật</strong>`,
    }
    MailGun.messages().send(data, function(err, result) {
        if (err)
            console.log(err);
        console.log('an email is sent to ' + data.to);
    });
}

service.sendDoBidSuccess = function(email, userName) {
    var data = {
        from: 'AUCTION SERVICE <service@unitest.vn>',
        subject: '[AUCTION] Đấu giá hoàn tất',
        to: email,
        html: `<p>Xin chào, <strong>${userName}</strong>, bạn đã đấu giá thành công tại <a href="139.59.230.231:3000">AUCTION SERVICE</a></p>` +
            `----` +
            `<p>Trân trọng</p>` +
            `<strong>Bp. Kỹ thuật</strong>`,
    }
    MailGun.messages().send(data, function(err, result) {
        if (err)
            console.log(err);
        console.log('an email is sent to ' + data.to);
    });
}

service.sendKickBid = function(email, userName) {
    var data = {
        from: 'AUCTION SERVICE <service@unitest.vn>',
        subject: '[AUCTION] Kick khỏi đấu giá',
        to: email,
        html: `<p>Xin chào, <strong>${userName}</strong>, bạn đã bị kích khỏi 1 phiên đấu giá tại <a href="139.59.230.231:3000">AUCTION SERVICE</a></p>` +
            `----` +
            `<p>Trân trọng</p>` +
            `<strong>Bp. Kỹ thuật</strong>`,
    }
    MailGun.messages().send(data, function(err, result) {
        if (err)
            console.log(err);
        console.log('an email is sent to ' + data.to);
    });
}

service.sendDoneBid = function(email, userName) {
    var data = {
        from: 'AUCTION SERVICE <service@unitest.vn>',
        subject: '[AUCTION] Hoàn tất đấu giá',
        to: email,
        html: `<p>Xin chào, <strong>${userName}</strong>, bạn đã chiến thắng 1 phiên đấu giá tại <a href="139.59.230.231:3000">AUCTION SERVICE</a></p>` +
            `----` +
            `<p>Trân trọng</p>` +
            `<strong>Bp. Kỹ thuật</strong>`,
    }
    MailGun.messages().send(data, function(err, result) {
        if (err)
            console.log(err);
        console.log('an email is sent to ' + data.to);
    });
}

service.sendDoneSell = function(email, userName) {
    var data = {
        from: 'AUCTION SERVICE <service@unitest.vn>',
        subject: '[AUCTION] Đã bán sản phẩm',
        to: email,
        html: `<p>Xin chào, <strong>${userName}</strong>, bạn đã bán thành công sản phẩm trong 1 phiên đấu giá tại <a href="139.59.230.231:3000">AUCTION SERVICE</a></p>` +
            `----` +
            `<p>Trân trọng</p>` +
            `<strong>Bp. Kỹ thuật</strong>`,
    }
    MailGun.messages().send(data, function(err, result) {
        if (err)
            console.log(err);
        console.log('an email is sent to ' + data.to);
    });
}

module.exports = service;

//service.send('Unitest Admin <admin@unitest.vn>', 'chunguyenanhtuan@gmail.com', 'Test Email', 'Hello World');
// service.sendConfirmEmail(Date.now(), 'black.thanhtri@gmail.com', function (err, result) {
//     console.log(err, result);
// })