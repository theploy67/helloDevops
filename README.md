Group: helloDevops ⭐

✅ วิธี clone git-------------------------------------------
1.สร้าง folder หรือไปที่ folder ที่ต้องการ
2.คลิกขวา กด "Open in Terminal"
3.ใส่คำสั่งใน command
git clone https://github.com/theploy67/helloDevops.git

------------------------------------------------------
แจ้งให้ทราบ
เราจะมี branch กันทั้งหมด 3 กลุ่มใหญ่
1.main : จะเป็น branch หลักที่รวมโค้ดที่สมบูรณ์และเป็นฉบับจริงมาไว้ที่ branch นี้
2.develop : จะเป็น branch ที่รวมโค้ดเพื่อนๆทุกคนเปรียบเสมือน main มีเพื่อเอามาเช็คโค้ดก่อนเอาไปที่ branch main เผื่อพัง
3.[branchชื่อเพื่อนๆ] : branch นี้จะเป็น branch สำหรับให้เพื่อนได้ push โค้ดของตัวเองเก็บไว้ของใครของมัน

เพื่อป้องกันไม่ให้โค้ดเกินการ เมิร์ท กัน- ทุกคนจะมี branch ชื่อของตัวเอง ได้แก่
ploy
mint
grace
fluke
pair

⚠️สำคัญ : ก่อนจะ push งานขึ้น git แจ้งในกลุ่มก่อนทุกครั้ง
⚠️สำคัญ : ห้ามเพื่อนๆ push code ไปที่ branch "main" เด็ดขาด
ก่อนจะอัพงาน ทุกคนต้องเช็ค ว่าอยู่ branch ชื่อตัวเองไหม
ด้วยคำสั่ง "git branch"
example:
PS C:\Users\ployhp\Desktop\HelloDevops\helloDevops> git branch
  develop
  fluke
  grace
* main   --> เครื่องหมาย * คือ branch ปัจจุบันที่กำลังทำงานอ
  mint
  pair
  ploy
----------------------------------------------------
✅Step 1 - วิธีการอัพงานตัวเองขึ้นไปบน git บน branch ตัวเอง
⚠️ เพื่อนทุกคนต้อง commit ทุกวัน ศ. เวลา 23.59
1.เข้าไปที่ terminal ใน vs code หรือ Intellij หรือ ไปที่ CMD ที่ root folder project

2.ตรวจสอบว่าอยู่ branch ตัวเองรึยัง ⭐สำคัญ
git branch
--> ถ้ายังไม่อยู่ ให้สลับไป branch ของตัวเอง เช่น ploy
--> git switch ploy

3.เช็กว่าไฟล์ไหนถูกแก้ไขแล้ว [ไฟล์ไหนที่ถูกแก้ไข จะมีสีแดง และเขียนว่า motified]
git status

4.เลือกไฟล์ที่ต้องการอัพขึ้น
git add <ชื่อไฟล์> 

 เช่น PS C:\Users\ployhp\Desktop\HelloDevops\helloDevops> git add README.md

--> หรือถ้าอยาก add ทุกไฟล์ที่แก้
--> git add .

5.ตรวจเช็กว่าไฟล์ไหนถูกแก้ไขแล้วอีกครั้ง [ไฟล์ไหนที่เลือก git add . จะมีสีเขียว และเขียนว่า motified]
git status

PS C:\Users\ployhp\Desktop\HelloDevops\helloDevops> git status
On branch ploy --->อยู่ branch ชื่อ ploy แล้ว
Your branch is up to date with 'origin/ploy'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   README.mdex.  ---> ไฟล์นี้ถูกแก้ไข 


6. Commit เพื่อบันทึกการเปลี่ยนแปลงใน branch ตัวเอง
git commit -m "feat: อธิบายสิ่งที่ทำ เช่น เพิ่มหน้า Login"

7.Push ขึ้นไปที่ GitHub (ครั้งแรกต้อง set upstream)
--> git push -u origin ชื่อbranch  เช่น
--> git push -u origin ploy

----------------------------------------------------------------
✅Step2 - เอางานบน branch ตัวเอง push ต่อไปที่ develop
❌ พอยดูส่วนนี้คนเดียว
1.กลับมาที่ branch develop
-->git checkout develop

2.ดึงโค้ดล่าสุดของ develop มาก่อน (กันพัง)
-->git pull origin develop

3.รวมงานจาก branch ของเพื่อน (ตัวอย่าง: mint)
-->git merge --no-ff mint -m "merge: mint → develop"

4.ดัน develop ขึ้น GitHub
-->git push origin develop

# ตอนนี้โค้ดจาก เพื่อน จะถูกรวมเข้าที่ develop แล้ว

------------------------------------------------------------------
✅Step3 - เอาโค้ดจาก develop ไปที่ main
❌ พอยดูส่วนนี้คนเดียว
1.ตรวจสอบว่า develop สมบูรณ์แล้ว
เพื่อนทุกคน push งานตัวเองเข้ามาใน develop เรียบร้อย
ทดสอบระบบ ไม่มีบั๊กใหญ่ UI/UX ทำงานได้ครบตามที่ต้องการ

2.ไปที่ branch develop ในเครื่องเรา
git checkout develop
git pull origin develop --> (ดึงของล่าสุดมาก่อน กันพลาด)

3.ไปที่ branch main
git checkout main
git pull origin main

4.merge develop -> main
git merge --no-ff develop -m "merge: develop → main (release version 1.0)"

--no-ff → จะสร้าง commit ว่า merge ครั้งนี้มาจาก develop
-m → เขียนข้อความบอกว่า merge release

5. push main ขึ้น github
git push origin main

----------------------------------------------------------------
ถ้าคุณ **git add** ไฟล์ผิดไปแล้ว ยังไม่ได้ commit
สามารถ “ยกเลิก” ได้ตามนี้ 

1. ยกเลิกเฉพาะไฟล์ที่ add ไปแล้ว
git restore --staged <ชื่อไฟล์>

เช่น:
git restore --staged README.md

2. ยกเลิกทุกไฟล์ที่ถูก add ไปแล้ว
git restore --staged .

3. ถ้าคุณอยากกลับไปไฟล์เดิมทั้งหมด (รวมลบการแก้ไขใน working directory ด้วย ‼️)
git restore <ชื่อไฟล์>

หรือทุกไฟล์
git restore .


⚠️ ระวังอันนี้จะทำให้ไฟล์หายไปเป็นเวอร์ชันก่อนแก้ (undo code)
ปกติถ้าแค่ **ยกเลิก git add** ก่อน commit ใช้
git restore --staged <file>