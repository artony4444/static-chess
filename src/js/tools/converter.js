

class xy
{
    static a1 = 11;
    static a2 = 12;
    static a3 = 13;
    static a4 = 14;
    static a5 = 15;
    static a6 = 16;
    static a7 = 17;
    static a8 = 18;
    static b1 = 21;
    static b2 = 22;
    static b3 = 23;
    static b4 = 24;
    static b5 = 25;
    static b6 = 26;
    static b7 = 27;
    static b8 = 28;
    static c1 = 31;
    static c2 = 32;
    static c3 = 33;
    static c4 = 34;
    static c5 = 35;
    static c6 = 36;
    static c7 = 37;
    static c8 = 38;
    static d1 = 41;
    static d2 = 42;
    static d3 = 43;
    static d4 = 44;
    static d5 = 45;
    static d6 = 46;
    static d7 = 47;
    static d8 = 48;
    static e1 = 51;
    static e2 = 52;
    static e3 = 53;
    static e4 = 54;
    static e5 = 55;
    static e6 = 56;
    static e7 = 57;
    static e8 = 58;
    static f1 = 61;
    static f2 = 62;
    static f3 = 63;
    static f4 = 64;
    static f5 = 65;
    static f6 = 66;
    static f7 = 67;
    static f8 = 68;
    static g1 = 71;
    static g2 = 72;
    static g3 = 73;
    static g4 = 74;
    static g5 = 75;
    static g6 = 76;
    static g7 = 77;
    static g8 = 78;
    static h1 = 81;
    static h2 = 82;
    static h3 = 83;
    static h4 = 84;
    static h5 = 85;
    static h6 = 86;
    static h7 = 87;
    static h8 = 88;
}


class get
{
    //  str : a1  //  int. : 11  //  ray : [0, 0]  //
    
    static int2str(xy)
    {
        if(Number.isInteger(xy) == false)
        {
            return string.invalid;
        }
        
        let x = parseInt(xy / 10);
        let y = parseInt(xy % 10);
        
        if(x < 1 || x > 8 || y < 1 || y > 8)
        {
            return string.invalid;
        }
        
        let l = "0abcdefgh".charAt(x); // String.fromCharCode(97+x)
        return l+y;
    }
    
    static str2int(ay)
    {
        if( ay.length != 2 || Boolean(ay.match(/[a-h][1-8]/)) == false)
        {
            return string.invalid;
        }
        
        return xy[ay];
        
        /*
        let x = '0abcdefgh'.indexOf(ay[0]);
        let y = parseInt(ay[1]);
        
        return x * 10 + y;
        */
    }
    
    static ray2int(x, y)
    {
        if( Number.isInteger(x+y) == false || x < 0 || x > 7 || y < 0 || y > 7)
        {
            return string.invalid;
        }
        
        return (x+1) * 10 + (y+1);
    }
    
    static int2ray(xy)
    {
        if(Number.isInteger(xy) == false)
        {
            return string.invalid;
        }
        
        let x = parseInt(xy / 10);
        let y = parseInt(xy % 10);
        
        if(x < 1 || x > 8 || y < 1 || y > 8)
        {
            return string.invalid;
        }
        
        return new Array(x-1, y-1); // [x-1, y-1];
    }
    
    static ray2str(x, y)
    {
        return this.int2str(this.ray2int(x, y));
    }
    
    static str2ray(str)
    {
        return this.int2ray(this.str2int(str));
    }
    
    // --- direct
    
    static toStr(obj)
    {
        if(Number.isInteger(obj))
        {
            return this.int2str(obj);
        }
        if(typeof obj == "string")
        {
            return this.int2str(this.str2int(obj));
        }
        if(typeof obj == "object" && obj.length == 2)
        {
            return this.ray2str(obj[0], obj[1]);
        }        
        
        return string.invalid;
    }
    
    static toInt(obj)
    {
        if(Number.isInteger(obj))
        {
            return this.str2int(this.int2str(obj));
        }
        if(typeof obj == "string")
        {
            return this.str2int(obj);
        }
        if(typeof obj == "object" && obj.length == 2)
        {
            return this.ray2int(obj[0], obj[1]);
        }
        
        return string.invalid;
    }
    
    static toRay(obj)
    {
        if(Number.isInteger(obj))
        {
            return this.int2ray(obj);
        }
        if(typeof obj == "string")
        {
            return this.str2ray(obj);
        }
        if(typeof obj == "object" && obj.length == 2)
        {
            return this.int2ray(this.ray2int(obj[0], obj[1]));
        }
        
        return string.invalid;
    }
    
    static int22str(array)
    {
        let arr = [];
        
        for(let XY of array)
        {
            arr.push(this.int2str(XY));
        }
        
        return arr;
    }
}
